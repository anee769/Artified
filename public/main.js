const pageTabs = document.querySelectorAll('.tabs');
window.onload = selectTab;
function selectTab() {
    removeBorder();
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page=='') {
        const home = document.getElementById('home');
        home.classList.add('active');
    } else if(page=='explore') {
        const explore = document.getElementById('explore');
        explore.classList.add('active');
    } else if(page=='convert') {
        const convert = document.getElementById('convert');
        convert.classList.add('active');
    }
}

function removeBorder() {
    pageTabs.forEach(pageTab => pageTab.classList.remove('active'));
}

