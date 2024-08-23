function mobilemenuclick() {
    const menuid = document.getElementById('mobilemenu');
    menuid.classList.remove("hidden");
    menuid.classList.add("block");
}

function mobilemenuclose() {
    const menuid = document.getElementById('mobilemenu');
    menuid.classList.remove("block");
    menuid.classList.add("hidden");
}

$(document).ready(function() {
    $('#datatabledashborad').DataTable({
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": false,
        "ordering": false,
        "responsive": true
    });
    $('#datatablemain').DataTable({
        "ordering": false,
        "responsive": true
    });
    $('.datatabelsimpel').DataTable({
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": false,
        "ordering": false,
        "responsive": true
    });
});

jQuery(document).ready(function(){
    jQuery('.scrollbar-macosx').scrollbar();
});