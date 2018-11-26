/**
 * Created by jazz on 2/24/17.
 */

function send_ajax_form(form_id, edit,modal_id,refresh_page){

    $('#'+form_id).on('submit',function(){

        var $form = $(this);         //Formulario
        var $url = $form.attr('action');    //Direccion url
        var $dat = $form.serialize();       //Datos del formulario
        var $method = $form.attr('method'); //Metodo get o post

        //Ocultar todos los errores y mensajes
        $('.errors, #message').fadeOut('fast');

        $.ajax({
            url:$url,
            type:$method,
            dataType:'json',
            data:$dat,
            success:function($data){

                if($data.success==false){
                    if($data.errors){
                        var $c = 100
                        $.each($data.errors,function($i,$value){
                            $('#_'+$i).html($value).fadeIn('fast');
                            setTimeout(function(){
                                $('#_'+$i).fadeOut()
                            },5000+$c)

                            $c = $c+100
                        });

                    }

                    if($data.message){
                        toastr.error($data.message)
                    }

                }else{

                    if(edit==false){
                        $form[0].reset();
                    }else{
                        //Canbiar el estado de los input check al retornar succes
                    }

                    if($data.message){
                        toastr.success($data.message)
                        $("#"+modal_id).modal('hide')
                        // if(refresh_page==true)
                        //     alert($(document).location)
                    }

                }
            }
        });

        return false;

    });

}

function sendAjaxFormAlias(form_id, edit,modal_id){

    $('#'+form_id).on('submit',function(){

        var $form = $(this);         //Formulario
        var $url = $form.attr('action');    //Direccion url
        var $dat = $form.serialize();       //Datos del formulario
        var $method = $form.attr('method'); //Metodo get o post

        //Ocultar todos los errores y mensajes
        $('.errors, #message').fadeOut('fast');

        $.ajax({
            url:$url,
            type:$method,
            dataType:'json',
            data:$dat,
            success:function($data){

                if($data.success==false){
                    if($data.errors){
                        $.each($data.errors,function($i,$value){
                            $('#_'+$i).html($value).fadeIn('fast');
                        });
                    }

                    if($data.message){
                        swal({
                            title: "Error",
                            text: $data.message,
                            timer: 4500,
                            showConfirmButton: true,
                            type: "error",
                        });
                    }

                }else{

                    if(edit==false){
                        //Cambiar el estado de los input check al retornar success
                        if($('#aliasisrestricted').attr('active')=='active'){
                            $('#aliasisrestricted').click().attr('active','');
                        }
                        $form[0].reset();
                    }

                    if($data.message){
                        $('body').attr('refreshData','true');
                        swal({
                            title: "Completado",
                            text: $data.message,
                            timer: 4500,
                            showConfirmButton: true,
                            type: "success",
                        });
                    }

                }
            }
        });

        return false;

    });

}

function ajaxSendMailbox(form_id){

    $('#'+form_id).on('submit',function(){

        var $form = $(this);         //Formulario
        var $url = $form.attr('action');    //Direccion url
        var $dat = $form.serialize();       //Datos del formulario
        var $method = $form.attr('method'); //Metodo get o post

        //Ocultar todos los errores y mensajes
        $('.errors, #message').fadeOut('fast');

        $.ajax({
            url:$url,
            type:$method,
            dataType:'json',
            data:$dat,
            success:function($data){

                if($data.success==false){
                    if($data.errors){
                        $.each($data.errors,function($i,$value){
                            $('#_'+$i).html($value).fadeIn('fast');
                        });
                    }

                    if($data.message){
                        swal({
                            title: "Error",
                            text: $data.message,
                            timer: 4500,
                            showConfirmButton: true,
                            type: "error",
                        });
                    }

                }else{

                    $form[0].reset();

                    $('#general_btn').click();

                    if($data.message){
                        $('body').attr('refreshData','true');
                        swal({
                            title: "Correcto",
                            text: $data.message,
                            timer: 4500,
                            showConfirmButton: true,
                            type: "Completado",
                        });
                    }

                    //Eliminar acceso personalizado
                    $('#hascuscomaccess').attr('active','');
                    $('#allowedsender').val('');
                    $('#allowedrecipient').val('');

                }
            }
        });

        return false;

    });

}
function send_ajax_form_data(form_id, edit,modal_id){

    $('#'+form_id).on('submit',function(){

        var $form = $('#'+form_id);         //Formulario
        var $url = $form.attr('action');    //Direccion url
        var $dat = $form.serialize();       //Datos del formulario
        var $method = $form.attr('method'); //Metodo get o post

        //Ocultar todos los errores y mensajes
        $('.errors, #message').fadeOut('fast');

        $.ajax({
            url:$url,
            type:'post',
            data:new FormData(this),
            contentType: false,       // The content type used when sending data to the server.
            processData:false,
            dataType:'json',
            success:function($data){

                if($data.success==false){
                    var $c = 100
                    if($data.errors){
                        $.each($data.errors,function($i,$value){
                            $('#_'+$i).html($value).fadeIn('fast');
                            setTimeout(function(){
                                $('#_'+$i).fadeOut()
                            },5000+$c)

                            $c = $c+100
                        });
                    }

                    if($data.message){
                        swal({
                            title: "Error",
                            text: $data.message,
                            timer: 4500,
                            showConfirmButton: true,
                            type: "error",
                        });
                    }

                }else{

                    if(edit==false){
                        $form[0].reset();
                    }

                    if($data.message){
                        swal({
                            title: "Completado",
                            text: $data.message,
                            timer: 4500,
                            showConfirmButton: true,
                            type: "success",
                        });
                        if(modal_id)
                            $("#"+modal_id).modal('hide')
                    }

                }

            }

        });

        return false;

    });

}