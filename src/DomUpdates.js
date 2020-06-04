
class DomUpdates {
    constructor() {
        this.counter = 0;
    }

    cycleImages(destinations) {
        this.counter++
        if(this.counter === destinations.length + 1) {
            this.counter = 0
        }
        console.log(destinations[this.counter])
        let mainArea = document.querySelector('.main')
        mainArea.innerHTML = `<header class='welcome-message'><h2>Welcome to Travel Tracker</h2></header>
        <section class='cycling-images'><img src="${destinations[this.counter].image}" alt="destination-image" class='cycling-images'>
        <footer>Your Vacation Awaits!</footer></section>`
        setTimeout(this.cycleImages, 1000, destinations);
    }

    displayUserPage() {

    }

    displayAgentPage() {

    }
}

export default DomUpdates;