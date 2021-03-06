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
    //Display data on page
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
            cardFront.insertAdjacentHTML('beforeend', '<h2>' + element.name + '</h2>' + '<p>' + element.speed + 'km/h' + '</p>');
            var cardBack = document.createElement('DIV');
            cardBack.setAttribute('class', 'card-back');
            carsBox.appendChild(cardBack);
            // cardBack.appendChild(img);
            cardBack.setAttribute('style', 'background:url(' + img.src + ')');
            document.querySelector('#cars-container').appendChild(carsBox);
            cardBack.insertAdjacentHTML('beforeend', '<h2>' + element.name + '</h2>' + '<p>' + element.speed + 'km/h' + '</p>' + '<h6>' + element.description + '</h6>');
            var btnStart = document.querySelector('#start-animation');
            btnStart.style.display = 'none';


        }, this);
    }

    //Filter data by car name
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
    //flipping card -toggle class
    function flipCard(data) {
        var elements = document.querySelectorAll('.flip');

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('mouseenter', function (data) {
                this.classList.toggle('flipped');

            });
   
            // elements[i].addEventListener('mouseleave', function (data) {
            //     this.classList.remove('flipped');
            // });
        }
    }
    //Card is clicked and moved in the box for animation
    function chooseCarToAnimate(data) {
        var carsItem = document.querySelectorAll('.flip');
        for (var i = 0; i < carsItem.length; i++) {

            var cardBack = carsItem[i].querySelector('.card-back');
            // console.log('clcikced333', lis)
            cardBack.onclick = function (ev) {

                var btnStart = document.querySelector('#start-animation');
                btnStart.style.display = 'block';
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
    //Animate cars depending on cars speed
    var btnStart = document.querySelector('#start-animation');
    btnStart.addEventListener('click', function (ev) {
        var listChosenCars = ev.currentTarget.previousSibling.previousSibling.children;
        console.log(listChosenCars);

        (function animateCars(listChosenCars) {
            var element = document.querySelectorAll(".animate-item img");
            for (var i = 0; i <= element.length; i++) {

                var carsSpeed = element[i].nextSibling.nextSibling.innerText;
                var speedParse = parseInt(carsSpeed);
                (function () {
                    var j = i;
                    var speed = 50 / speedParse * 100;
                    var width = element[j].width / 10;
                    //console.log(width);
                    var pos = 0 + width;
                    var id = setInterval(start, speed);

                    function start() {
                        // var bg = element[j].parentElement;
                        if (pos == 100) {
                            clearInterval(id);
                            console.log('clear interval')
                            //  element[j].parentElement.style.background = 'yellow';

                        } else {
                            pos++;
                            element[j].style.left = pos - width + '%';
                            // bg.style.background = 'red'
                        }
                    }
                })();
            }
        })()
    });

}());