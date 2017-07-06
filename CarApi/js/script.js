(function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.json-generator.com/api/json/get/bQJcQFdAGG?indent=4', true);
    //pull data from API
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            displayDataFromApi(data);
            flipCard(data);

            chooseCarToAnimate(data);
            console.log(data)
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
    //display data in Html Page
    function displayDataFromApi(data) {
        // console.log(data.data[0].name);
        var arrElements = data.data;
        //  console.log('arrElements', arrElements);
        arrElements.forEach(function (element) {
            //console.log('element', element.name);
            var img = new Image();
            img.src = element.image;
            // console.log('img.src', img.src)
            var carsBox = document.createElement('LI');
            carsBox.setAttribute('class', 'cars-list-item flip col-md-4');
            var cardFront = document.createElement('DIV');
            cardFront.setAttribute('class', 'card-front');
            carsBox.appendChild(cardFront);
            cardFront.appendChild(img);

            document.querySelector('#cars-container').appendChild(carsBox);
            cardFront.insertAdjacentHTML('beforeend', '<h2>' + element.name + '</h2>' + '<p>' + element.speed + 'km/h' + '<p>');
            // carsBox.insertAdjacentHTML('beforeend', '<div class="card-back">' + '<h1>' + element.name + '</h1>' + '<p>' + element.speed + 'km/h' + '<p>' + '<h6>' + element.description + '</h6>' + '</div>');
            var cardBack = document.createElement('DIV');
            cardBack.setAttribute('class', 'card-back');
            carsBox.appendChild(cardBack);
            // cardBack.appendChild(img);
            cardBack.setAttribute('style', 'background:url(' + img.src + ')');
            document.querySelector('#cars-container').appendChild(carsBox);
            cardBack.insertAdjacentHTML('beforeend', '<h2>' + element.name + '</h2>' + '<p>' + element.speed + 'km/h' + '<p>' + '<h6>' + element.description + '</h6>');

        }, this);
    }

    //filter data by car name
    document.querySelector('#filter-input').addEventListener('keyup', filterCarList);

    function filterCarList(data) {
        var input, filter, ul, li, h2, i;
        input = document.querySelector('#filter-input');
        filter = input.value.toUpperCase();
        ul = document.querySelector('#cars-container');
        li = ul.getElementsByTagName('li');
        for (i = 0; i < li.length; i++) {
            h2 = li[i].getElementsByTagName('h2')[0];
            if (h2.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';

            }
        }
    }
    //flip card
    function flipCard(data) {
        var elements = document.querySelectorAll('.flip');

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('mouseenter', function (data) {
                //mouseenter
                if (this.classList) {
                    this.classList.toggle('flipped');

                    // document.querySelector('.flipped').style.backgroundColor = "blue";
                    //moveCarToAnimate(data)
                } else {
                    var classes = this.className.split(' ');
                    var existingIndex = classes.indexOf('flipped');

                    if (existingIndex >= 0)
                        classes.splice(existingIndex, 1);
                    else
                        classes.push(fliped);

                    this.className = classes.join(' ');
                }
            });
            elements[i].addEventListener('mouseleave', function (data) {

                if (this.classList) {
                    this.classList.toggle('flip');
                } else {
                    var classes = this.className.split(' ');
                    var existingIndex = classes.indexOf('flip');

                    if (existingIndex >= 0)
                        classes.splice(existingIndex, 1);
                    else
                        classes.push(fliped);

                    this.className = classes.join(' ');
                }
            });
        }
    }

    function chooseCarToAnimate(data) {
        var carsItem = document.querySelectorAll('.flip');

        for (var i = 0; i < carsItem.length; i++) {

            var cardBack = carsItem[i].querySelector('.card-back');
            // console.log('clcikced333', lis)


            cardBack.onclick = function (ev) {
                this.onclick = null; //da element mozemo samo jednom kliknuti i disejblovati click event
                if (cardBack.getAttribute("class") == "card-back") {
                    var carClicked = ev.currentTarget.previousSibling.innerHTML;
                    // this.classList.add("disabledbutton");
                    //  var tes = ev.currentTarget.parentElement.innerHTML;
                    this.parentNode.classList.add("disabledbutton");
                    var listChoosenCarsToAnimate = document.querySelector('.animate-box');
                    listChoosenCarsToAnimate.insertAdjacentHTML('beforeend', '<div class="animate-item">' + carClicked + '</div>');
                }

            };

        }
    }


}());