const search_btn = document.getElementById('search-btn');

search_btn.addEventListener('click', (e) => {
    e.preventDefault()
    const search_data = document.getElementById('search-field');
    console.log(search_data.value)
});
