const pageTabs = document.querySelectorAll('.tabs');
window.onload = selectTab;
function selectTab() {
    console.log('hi');
    removeBorder();
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log('hi',page);
    if(page=='') {
        const home = document.getElementById('home');
        home.classList.add('active');
    } else if(page=='styles') {
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

