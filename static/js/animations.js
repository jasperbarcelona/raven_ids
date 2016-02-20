$(document).ready(function(){

searchStatus = 'off'
profile_options = 'closed'

$('.loading').hide();
$('.intro-loader').show();
$('.add-user-footer-left').hide();
$('#snackbar').hide();
$('.id-loader').hide();
$('#profile-options').hide();

$(window).load(function() {
    $('#intro-mask').hide();
    $('#intro').fadeOut();
});

/*$(".datepicker").datepicker({
    dateFormat: "MM dd, yy"
});
*/
$(".datepicker").datepicker({
        dateFormat: 'MM yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,

        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('MM yy', new Date(year, month, 1)));
        }
    });

    $(".datepicker").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });

$('.add-user-modal-body .form-control').floatlabel({
    labelEndTop:'-2px'
});

$('.search-panel').hide();

$('.clockpicker').clockpicker({
    autoclose: true
});

$('.clockpicker-top').clockpicker({
    autoclose: true,
    placement: 'top'
});

$('#confirm-send').attr('disabled',true);

$('#message').on('keyup', function(){
    if (!$.trim($(this).val())) {
        $('#send').attr('disabled',true);
    }
    else if (this.value){
        $('#send').removeAttr('disabled');
    }
});

$('#confirm-modal').on('hidden.bs.modal', function () {
    $('#message-confirm-password').val('');
    $('#confirm-send').attr('disabled',true);
});

$('#message-status-modal').on('hidden.bs.modal', function () {
    open_messages();
});

$('#message-confirm-password').on('keyup', function(){
    if (!$.trim($(this).val())) {
        $('#confirm-send').attr('disabled',true);
    }
    else if (this.value){
        $('#confirm-send').removeAttr('disabled');
    }
});

$('.time').on('change', function(){
    $('#save-sched').removeAttr('disabled');
});

$('#schedule-modal').on('hidden.bs.modal', function () {
    $('#save-sched').attr('disabled',true);
});

$('.calendar-time').on('change', function(){
    $('#save-calendar-sched').removeAttr('disabled');
});

$('.no-class-checkbox').on('change', function(){
    listen_to_checkbox();
});

$('#calendar-schedule-modal').on('hidden.bs.modal', function () {
    $('#save-calendar-sched').attr('disabled',true);
});

$('.add-modal').on('hidden.bs.modal', function () {
    clear_data();
    $('.save-btn').attr('disabled',true);
});

$('#compose-message-modal').on('shown.bs.modal', function () {
    $('#message').focus();
});

$('#confirm-modal').on('shown.bs.modal', function () {
    $('#message-confirm-password').focus();
});

$('#add-student-modal').on('shown.bs.modal', function () {
    $('#add_student_id_no').focus();
});

$('#add-user-modal').on('shown.bs.modal', function () {
    $('#add_user_id_no').focus();
});


$('#sched-cancel').on('click', function () {
    $('#save-sched').attr('disabled',true);
});

$('#header-display-pic').on('click', function () {
    var $this = jQuery(this);
    if ($this.data('activated')) return false;  // Pending, return
    $this.data('activated', true);
    setTimeout(function() {
      $this.data('activated', false)
    }, 500); // Freeze for 500ms

    if ((typeof profile_options === 'undefined') || (profile_options == 'closed')){
        var travel_width = $('#profile-options').width();
        $('#user-icon-container').animate({'margin-right':travel_width+2});
        profile_options = 'open'
        setTimeout(function() {
            $('#profile-options').fadeIn();
        }, 500); // Freeze for 500ms
    }
    else{
        $('#profile-options').fadeOut();
        profile_options = 'closed'
        setTimeout(function() {
            $('#user-icon-container').animate({'margin-right':'0'});
        }, 500); // Freeze for 500ms
    }
});

$('#search-btn').on('click', function () {
    var $this = jQuery(this);
    if ($this.data('activated')) return false;  // Pending, return
        $this.data('activated', true);
        setTimeout(function() {
            $this.data('activated', false)
        }, 500); // Freeze for 500ms
        
    toggle_search()
    
});

$('#add-student-modal .add-user-modal-body .form-control').on('change', function () {
    var re = /[A-Za-z]+$/;
    if (($('#add_student_last_name').val() != "") && ($('#add_student_first_name').val() != "") && 
        (re.test($('#add_student_last_name').val())) && (re.test($('#add_student_first_name').val())) && 
        ($('#add_student_level').val() != null) && ($('#add_student_section').val() != null) && ($('#add_student_contact').val() != null) &&
        (!isNaN($('#add_student_contact').val())) && ($('#add_student_contact').val().length == 11) && ($('#student-id-error').text().length == 0)  &&
        ($('#add_student_id_no').val().length == 10)){
        $('#save-student').removeAttr('disabled');
    }
    else{
        $('#save-student').attr('disabled',true);
    }
});

$('#add-user-modal .add-user-modal-body .form-control').on('change', function () {
    var re = /[A-Za-z]+$/;
    if (($('#add_user_last_name').val() != "") && ($('#add_user_first_name').val() != "") && 
        (re.test($('#add_user_last_name').val())) && 
        (re.test($('#add_user_first_name').val())) &&
        ($('#user-id-error').text().length == 0) && ($('#add_user_id_no').val().length == 10)){
        $('#save-user').removeAttr('disabled'); 
    }
    else{
        $('#save-user').attr('disabled',true);
    }
});

$('#add-student-modal .add-user-modal-body .form-control').donetyping(function(){
    var re = /[A-Za-z]+$/;
    if (($('#add_student_last_name').val() != "") && ($('#add_student_first_name').val() != "") && 
        (re.test($('#add_student_last_name').val())) && (re.test($('#add_student_first_name').val())) && 
        ($('#add_student_level').val() != null) && ($('#add_student_section').val() != null) && ($('#add_student_contact').val() != null) &&
        (!isNaN($('#add_student_contact').val())) && ($('#add_student_contact').val().length == 11)){
        validate_student_form(true);
    }
    else{
        validate_student_form(false);
    }
});

$('#add-user-modal .add-user-modal-body .form-control').donetyping(function(){
    var re = /[A-Za-z]+$/;
    if (($('#add_user_last_name').val() != "") && ($('#add_user_first_name').val() != "") && 
        (re.test($('#add_user_last_name').val())) && (re.test($('#add_user_first_name').val()))){
        validate_user_form(true);
    }
    else{
        validate_user_form(false);
    }
});

$('#save-student').on('click', function(){
    $('#save-student').button('loading');
    var last_name = $('#add_student_last_name').val();
    var first_name = $('#add_student_first_name').val();
    var middle_name = $('#add_student_middle_name').val();
    var level = $('#add_student_level').val();
    var section = $('#add_student_section').val();
    var contact = $('#add_student_contact').val();
    var id_no = $('#add_student_id_no').val();
    save_student(last_name, first_name, middle_name, level, section, contact, id_no);
});

$('#save-user').on('click', function(){
    $('#save-user').attr('disabled',true);

    var last_name = $('#add_user_last_name').val();
    var first_name = $('#add_user_first_name').val();
    var middle_name = $('#add_user_middle_name').val();
    var id_no = $('#add_user_id_no').val();
    save_user(last_name, first_name, middle_name, id_no);
});


$('.search-attendance').keypress(function(e){
    if (e.which == 13) {
        show_search_load();
        search_attendance()
    }
});

$('.search-attendance-options').on('change', function(){
    show_search_load();
    search_attendance()
});

$('.search-logs').keypress(function(e){
    if (e.which == 13) {
        show_search_load();
        search_logs()
    }
});

$('.search-logs-options').on('change', function(){
    show_search_load();
    search_logs()
});

$('.search-absent').keypress(function(e){
    if (e.which == 13) {
        show_search_load();
        search_absent()
    }
});

$('.search-absent-options').on('change', function(){
    show_search_load();
    search_absent()
});

$('.search-late').keypress(function(e){
    if (e.which == 13) {
        show_search_load();
        search_late()
    }
});

$('.search-late-options').on('change', function(){
    search_late()
});

$('.no-class-checkbox').change(function() {
        if($(this).is(":checked")) {
            $('#'+$(this).attr('id')+'_calendar_sched').find('.input-group-addon').css('background-color','#4485F5');
            $('#'+$(this).attr('id')+'_calendar_sched .schedule-text').removeClass('unbind');
        }
        else{
            $('#'+$(this).attr('id')+'_calendar_sched').find('.input-group-addon').css('background-color','#999');
            $('#'+$(this).attr('id')+'_calendar_sched .schedule-text').addClass('unbind');
        }    
    });

$('.add-user-modal-body .form-control').on('keydown', function (e) {
    var key = e.which;
    if((key == 13) && ($('#save-student').is(':disabled') == false)){
        $('#save-student').trigger('click');
        return false;1
    }
});

});