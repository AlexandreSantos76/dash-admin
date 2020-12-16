export function withoutMask(value) {
  if (value === undefined)
    return;

  return value.replace(/[^\d]+/g, '');
}

export function phoneMask(v) {
  if (v) {
    v = v.replace(/\D/g, "");             //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }
}

export function cpfMask(v) {
  if (v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
  }
}

export function cnpjMask(v) {
  if (v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
    v = v.replace(/(\d{4})(\d)/, "$1-$2")
    return v
  }
}

export function cepMask(v) {
  if (v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{5})(\d)/, "$1-$2")
    return v
  }
}

export function cardNumberMask(v) {
  if (v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/^(\d{4})(\d)/g, "$1 $2");
    v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3");
    v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4");
    return v;
  }
}
export function sliceCardNumber(v) {
  return `${'*'.repeat(v.length - 4)}${v.substr(v.length - 4)}`;
}

export function CEP(str) {
  var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;

  if (re.test(str)) {
    return str.replace(re, "$1.$2-$3");
  } else {
    alert("CEP inválido!");
  }

  return "";
}