const getDate = (dateInput) => {
    const dateArray = dateInput.toLocaleDateString().split("/")
    return ([dateArray[1], dateArray[0], dateInput.getFullYear()].join("/"))
}
const mapDir = (index, dire) => {
    return {id: index, name: dire.nomenclatura}
}


export {getDate, mapDir}
