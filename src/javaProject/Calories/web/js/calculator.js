function Calculator() {
}
Calculator.prototype.sumOfArray = function(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++){
        sum += parseInt(arr[i]);
    }
    return sum;
}