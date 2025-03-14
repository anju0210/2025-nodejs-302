const letter = ['a', 'b', 'c', 'd']

for(let l = 0; l<letter.length; l++){
    console.log(letter[l])
}

letter.forEach(l => console.log(l))

for(const l of letter){
    console.log(l)
}