// functions.jsx
function div (a, b){
  // Handle division by zero
  return a / b;
}

function containsNumbers(text){
  for (let i = 0; i < text.length; i++) {
   if (!isNaN(text.charAt(i)))
    return true;
  }
  return false;
}

exports.div = div;
exports.containsNumbers = containsNumbers;