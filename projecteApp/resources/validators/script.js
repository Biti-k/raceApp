
let error = null;
let icon = null;
error = $('<div>').addClass('error').prop('role', 'alert').prop('aria-live', 'assertive');
icon = $('<i>').addClass('error').text('X');


// export function main()
// {
//     

//     let date = new Date();

    
//     let year = date.getFullYear();
//     let month = ('0' + (date.getMonth() + 1)).slice(-2); 
//     let day = ('0' + date.getDate()).slice(-2);

//     let minDate = year + '-' + month + '-' + day;

//     $('#data_entrada').prop('min', minDate);
//     $('#data_sortida').prop('min', minDate);


//     $('#form').on('submit',(evt)=>{ console.log(validateForm(evt)) });

//     $('#nom').on('blur', validarName);
//     $('#cognoms').on('blur', validarCognom);
//     $('#value').on('blur', validarvalue);
//     $('#data_naix').on('blur', validarDataNaix);
//     $('#password').on('blur', validarPass);
//     $('#data_entrada').on('blur', validarDataEntrada);
//     $('#data_sortida').on('blur', validarDataSortida);
//     $('#regim').on('blur', validarRegim);
//     $('#proposit').on('blur', validarProposit);
//     $('#num_adults').on('blur', validarNumAdults);
//     $('#num_nens').val(0);
//     $('#num_nens').on('blur', validarNumNens);
//     $('#tipus').on('blur', validarTipus);

    
// }
export function validarEmail(value){
    let re = /\S+@\S+\.\S+/;
    if($(value).next().length > 0){
        if($(value).next().prop('className').includes('error')){
            $(value).next().remove();
            $(value).removeClass('border-red')
        }
    }
    
    if($(value).val().length == 0){
        
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Es obligatori').clone() );
        
        return 0;
    }else if(!re.test($(value).val())){
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Format incorrecte').clone());
        
        return 0;
    }else{
        return 1;
    }
}


export function validarTelefon(value){
    if($(value).next().length > 0){
        if($(value).next().prop('className').includes('error')){
            $(value).next().remove();
            $(value).removeClass('border-red')
        }
    }
    
    if($(value).val().length == 0){
        
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Es obligatori').clone() );
        
        return 0;
    }else if($(value).val().length !== 9){
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Ha de tenir 9 digits').clone() );
        
        return 0;
    }else if(isNaN($(value).val())){
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Format incorrecte').clone() );
        
        return 0;
    }else{
        return 1;
    }
}

export function validarData(value){
    if($(value).next().length > 0){
        if($(value).next().prop('className').includes('error')){
            $(value).next().remove();
            $(value).removeClass('border-red')
        }
    }

    
    if($(value).val() === ""){
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Es obligatori').clone() );
        
        return 0;
    }else if($(value).val().length){
        return 1;
    }
}

export function validarRequired(value){
    if($(value).next().length > 0){
        if($(value).next().prop('className').includes('error')){
            $(value).next().remove();
            $(value).removeClass('border-red')
        }
    }

    
    if($(value).val().length == 0){
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Es obligatori').clone() );
        
        return 0;
    }else if($(value).val().length){
        return 1;
    }
}

export function validarNif(value){
    

    if($(value).next().length > 0){
        if($(value).next().prop('class').includes('error')){
            $(value).next().remove();
            $(value).removeClass('border-red')
        }
    }
    
    
    let lletres = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    
    // Abans de fer la operació es comprova que el numero de dni es realment un numero y no es 0 
    let dniNumber = Number($(value).val().trim().substr(0, $(value).val().length-1))
    let lletraCorrecta = !isNaN(dniNumber) && dniNumber != 0 ? lletres[dniNumber % 23] : null ;

    
    if($(value).val().length == 0){
        
        $(value).addClass('border-red')
        $(value).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(value).val().trim().length != 9){

        $(value).addClass('border-red')
        $(value).after($(error).text('Ha de tenir 9 caracters').clone());
        
        return 0;

    }else if(lletraCorrecta != $(value).val().substr($(value).val().length-1)){

        $(value).addClass('border-red')
        $(value).after($(error).text('La lletra no correspon amb el numero').clone());

    }else{
        return 1;
    }
}

export function validarMaxLength(value, max){
    if($(value).next().length > 0){
        if($(value).next().prop('className').includes('error')){
            $(value).next().remove();
            $(value).removeClass('border-red')
        }
    }

    
    if($(value).val().length >= max){
        $(value).addClass('border-red')
        $(value).after($(error, {"className" : "error"}).text('Màxim '+max+' caracters').clone() );
        
        return 0;
    }else if($(value).val().length){
        return 1;
    }
}