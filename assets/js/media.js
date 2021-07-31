const APIController = (function(){

    const clientId = '';
    const clientSecret = '';

    //private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ":" + clientSecret),
                },
            body: 'grant_type-client_credentials'    
        });
        
        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async (token) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }
    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit${limit}` , {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        });
        
        const data = results.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndpoint) => {

        const result = await fetch(`${trackEndpoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token,genreId) {
            return _getPlaylistByGenre(token,genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTracks(token, trackEndPoint);
        }
    }
})();

// UI Module

const UIController = (function() {

    //object to hold ref to HTML selection
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn-submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    // public methods
    return {

        //method to get input fields
        inputField(){
            return{
                genre:document.querySelector(DOMElements.selectGenre),
                playlist:document.querySelector(DOMElements.selectPlaylist),
                songs: document.querySelector(DOMElements.divSonglist),
                submit:document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // need method to create select list options
        createGenre(text, value) {
            const html = `<option value = "${value}>${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend' , html);
        },

        createPlaylist(text, value){
            const html = `<option value = "${value}>${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend' , html);
        },

        //need method to create track list group items
        createTrack(id, name) {
            const html = `<a href="#" class = "list-group-item list-group-item-action list-group-item-light" id = "${id}>${name}</a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend' , html)
        },

        //need method to create the song details
        createSongDetails(img, title, artist){

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            //at any time user clicks new song, need to clear out the song detail list
            detailDiv.innerHTML = '';
        
            const html = 
            `
            <div class row col-sm-12 px-0>
                <img src="${img}" alt="">
            </div>
            <div class = "row col-sm-12 px-0">
            <label for ="Genre" class = "form label col-sm-12">${title}</label>
            </div>
            <div class = "row col-sm-12 px-0">
            </div>

            `
        
        }





}


})();