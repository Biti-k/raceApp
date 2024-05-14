
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
//     $('#nif').on('blur', validarNif);
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

export function validarRequired(value){

    if($(value).next().prop('class').includes('error')){
        $(value).next().remove();
        $(value).removeClass('border-red')
    }
    
    if($(value).val().length == 0){
        
        $(value).addClass('border-red')
        $(value).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else{
        return 1;
    }
}

export function validarName(){
    
    let nom = $('#nom');

    if($(nom).next().prop('class').includes('error')){
        $(nom).next().remove();
        $(nom).removeClass('border-red')
    }
    
    if($(nom).val().length == 0){
        
        $(nom).addClass('border-red')
        $(nom).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(nom).val().trim().length < 3){

        $(nom).addClass('border-red')
        $(nom).after($(error).text('Ha de tenir minim 3 caracters').clone());
        
        return 0;
    }else{
        return 1;
    }
}

export function validarCognom(){
    
    let cognom = $('#cognoms');

    if($(cognom).next().prop('class').includes('error')){
        $(cognom).next().remove();
        $(cognom).removeClass('border-red')
    }

    
    if($(cognom).val().length == 0){
        
        $(cognom).addClass('border-red')
        $(cognom).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(cognom).val().trim().length < 3){

        $(cognom).addClass('border-red')
        $(cognom).after($(error).text('Ha de tenir minim 3 caracters').clone());
        
        return 0;
    }else{
        return 1;
    }
}

export function validarNif(){
    
    let nif = $('#nif');

    if($(nif).next().prop('class').includes('error')){
        $(nif).next().remove();
        $(nif).removeClass('border-red')
    }
    
    
    let lletres = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    
    // Abans de fer la operació es comprova que el numero de dni es realment un numero y no es 0 
    let dniNumber = Number($(nif).val().trim().substr(0, $(nif).val().length-1))
    let lletraCorrecta = !isNaN(dniNumber) && dniNumber != 0 ? lletres[dniNumber % 23] : null ;

    
    if($(nif).val().length == 0){
        
        $(nif).addClass('border-red')
        $(nif).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(nif).val().trim().length != 9){

        $(nif).addClass('border-red')
        $(nif).after($(error).text('Ha de tenir 9 caracters').clone());
        
        return 0;

    }else if(lletraCorrecta != $(nif).val().substr($(nif).val().length-1)){

        $(nif).addClass('border-red')
        $(nif).after($(error).text('La lletra no correspon amb el numero').clone());

    }else{
        return 1;
    }
}

export function validarDataNaix(){
    let data_naix = $('#data_naix');

    if($(data_naix).next().prop('class').includes('error')){
        $(data_naix).next().remove();
        $(data_naix).removeClass('border-red')
    }

    
    if($(data_naix).val().length == 0){
        
        $(data_naix).addClass('border-red')
        $(data_naix).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(data_naix).val().trim().length != 10){

        $(data_naix).addClass('border-red')
        $(data_naix).after($(error).text('El format no es correcte').clone());
        
        return 0;
    }else{
        return 1;
    }
}

export function validarPass(){
    
    let pass = $('#password');

    if($(pass).next().prop('class').includes('error')){
        $(pass).next().remove();
        $(pass).removeClass('border-red')
    }

    
    if($(pass).val().length == 0){
        
        $(pass).addClass('border-red')
        $(pass).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(pass).val().trim().length < 8){

        $(pass).addClass('border-red')
        $(pass).after($(error).text('Ha de tenir minim 8 caracters').clone());
        
        return 0;
    }else if(! (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!¡?¿.,;:_\-\\]).+$/).test($(pass).val().trim())){

        $(pass).addClass('border-red')
        $(pass).after($(error).text('Ha de tenir minim 1 numero i un caracter especial').clone());
    
    }else{
        return 1;
    }
}

export function validarDataEntrada(){
    let data_entrada = $('#data_entrada');

    if($(data_entrada).next().prop('class').includes('error')){
        $(data_entrada).next().remove();
        $(data_entrada).removeClass('border-red')
    }

    
    if($(data_entrada).val().length == 0){
        
        $(data_entrada).addClass('border-red')
        $(data_entrada).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(data_entrada).val().trim().length != 10){

        $(data_entrada).addClass('border-red')
        $(data_entrada).after($(error).text('El format no es correcte').clone());
        
        return 0;
    }else{
        let date = new Date($(data_entrada).val());
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2); 
        let day = ('0' + date.getDate()).slice(-2);

        let minDate = year + '-' + month + '-' + day;
        
        //validar que no hagin entrat la data de sortida abans de la d'entrada i en cas de que si que estigui bé
        if(validarDataSortida()){
            let data_sortida = new Date($('#data_sortida').val());
            
            if(date.getTime() > data_sortida.getTime()){
                $('#data_sortida').val('');
            }
        }

        $('#data_sortida').prop('min', minDate);
        
        return 1;
    }
}

export function validarDataSortida(){
    let data_sortida = $('#data_sortida');

    if($(data_sortida).next().prop('class').includes('error')){
        $(data_sortida).next().remove();
        $(data_sortida).removeClass('border-red')
    }

    
    if($(data_sortida).val().length == 0){
        
        $(data_sortida).addClass('border-red')
        $(data_sortida).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else if($(data_sortida).val().trim().length != 10){

        $(data_sortida).addClass('border-red')
        $(data_sortida).after($(error).text('El format no es correcte').clone());
        
        return 0;
    }else{
        return 1;
    }
}


export function validarRegim(){
    let regim = $('#regim');

    if($(regim).next().prop('class').includes('error')){
        $(regim).next().remove();
        $(regim).removeClass('border-red')
    }
    
    if($(regim).val() == -1){
        
        $(regim).addClass('border-red')
        $(regim).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else{
        return 1;
    }
}

export function validarProposit(){
    let proposit = $('#proposit');

    if($(proposit).next().prop('class').includes('error')){
        $(proposit).next().remove();
        $(proposit).removeClass('border-red')
    }
    
    if($(proposit).val() == -1){
        
        $(proposit).addClass('border-red')
        $(proposit).after($(error).text('Es obligatori').clone() );
        
        return 0;
    }else{
        return 1;
    }
}

export function validarNumAdults(){
    let num_adults = $('#num_adults');

    if($(num_adults).next().prop('class').includes('error')){
        $(num_adults).next().remove();
        $(num_adults).removeClass('border-red')
    }

    if($(num_adults).val().length == 0){
        
        $(num_adults).addClass('border-red')
        $(num_adults).after($(error).text('Es obligatori').clone() );
        
        return 0;
    } else if(isNaN(Number($(num_adults).val()))){
        
        $(num_adults).addClass('border-red')
        $(num_adults).after($(error).text('El format es incorrecte').clone() );
        
        return 0;
    }else if(Number($(num_adults).val()) < 1){
    
        $(num_adults).addClass('border-red')
        $(num_adults).after($(error).text('Minim 1 adult').clone() );
        
        return 0;
    }else{
        return 1;
    }
}

export function validarNumNens(){
    let num_nens = $('#num_nens');

    if($(num_nens).next().prop('class').includes('error')){
        $(num_nens).next().remove();
        $(num_nens).removeClass('border-red')
    }

    if($(num_nens).val().length == 0){
        
        $(num_nens).addClass('border-red')
        $(num_nens).after($(error).text('Es obligatori').clone() );
        
        return 0;
    } else if(isNaN(Number($(num_nens).val()))){
        
        $(num_nens).addClass('border-red')
        $(num_nens).after($(error).text('El format es incorrecte').clone() );
        
        return 0;
    }else if(Number($(num_nens).val()) < 0){
    
        $(num_nens).addClass('border-red')
        $(num_nens).after($(error).text('El numero ha de se positiu o 0').clone() );
        
        return 0;
    }else{
        return 1;
    }
}

export function validarTipus(){
    let tipus = $('#tipus');

    if($(tipus).next().prop('class').includes('error')){
        $(tipus).next().remove();
        $(tipus).removeClass('border-red')
    }

    if($(tipus).val() == -1){
        
        $(tipus).addClass('border-red')
        $(tipus).after($(error).text('Es obligatori').clone() );
        
        return 0;
    } else if (!isNaN(Number($('#num_adults').val())) && !isNaN(Number($('#num_nens').val()))){
        let maxPersones = 0;

        if(Number($(tipus).val()) == -1 || Number($(tipus).val()) < (Number($('#num_adults').val()) + Number($('#num_nens').val())) ){
            
            $(tipus).addClass('border-red')
            $(tipus).after($(error).text('El numero de persones es més gran del que permet l\'habitacio').clone() );
            
            return 0;
        }

        return 1;
    }
}


export function validateForm(event)
{
    event.preventDefault();
    
    validarName();
    validarCognom();
    validarNif();
    validarDataNaix();
    validarPass();
    validarDataEntrada();
    validarDataSortida();
    validarRegim();
    validarProposit();
    validarNumAdults();
    validarNumNens();
    validarTipus();

    if( validarName() &&
        validarCognom() &&
        validarNif() &&
        validarDataNaix() &&
        validarPass() &&
        validarDataEntrada() &&
        validarDataSortida() &&
        validarRegim() &&
        validarProposit() &&
        validarNumAdults() &&
        validarNumNens() &&
        validarTipus() 
    ){
        return 1;
    }else{
        return 0;
    }
    

}