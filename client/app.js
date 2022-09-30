const tableBody = document.getElementById('table-body')

function getFlights() {
    fetch('http://localhost:8000/flights')
        .then(response => response.json())
        .then(flights => {
            populateTable(flights)
        })
        .catch(error => console.log(error))
}

getFlights()

function populateTable(flights) {
    console.log(flights)

    for (const flight of flights) {
        // make a row for our flight
        const tableRow = document.createElement('tr')

        // add the cute airplane icon at the start
        const tableIcon = document.createElement('td')
        tableIcon.textContent = '✈'
        tableRow.append(tableIcon)

        const flightDetails = {
            time: flight.departing.slice(0, 5),
            destination: flight.destination.toUpperCase(),
            flight: flight.flightNumber.shift(),
            gate: flight.gate,
            remarks: flight.status.toUpperCase(),
        }

        // create cards for all the data
        for (const detail in flightDetails) {
            const tableCell = document.createElement('td')
            const word = Array.from(flightDetails[detail])

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')

                // cascade effect
                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                }, 100 * index)

                tableCell.append(letterElement)
            }

            tableRow.append(tableCell)
        }

        tableBody.append(tableRow)
    }
}