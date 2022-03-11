const sortByDesc = (data) => {
    let sorted = [];
    for (var i = data.length; i > 0; i--) {
        sorted.push(data[i-1]);
    }

    return sorted;
}

export { sortByDesc }