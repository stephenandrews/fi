/*
concat(string, string, ...) 	=> string
concat(bytes, bytes, ...) 		=> bytes
*/
module.exports = function(core) {
	return function(op) {
	 const ret = {
			code: []
			, type: false
		}
		if (op.length < 2) {
			throw 'Not enough arguments for function concat - expects at least two'
		}
		const instr = core.compile.ml('concat'); const a1 = core.compile.code(op.shift()); let an
		if (['string', 'bytes'].indexOf(a1.type[0]) < 0) {
			throw `Invalid type for concat, expecting string or bytes not ${a1.type[0]}`
		}
		ret.code = a1.code
		ret.type = a1.type
		while (op.length) {
			an = core.compile.code(op.shift())
			if (an.type[0] != ret.type[0]) {
				throw `Invalid type for concat, expecting ${ret.type[0]} not ${an.type[0]}`
			}
			ret.code.push(['DIP', an.code])
			ret.code.push(instr)
		}
		return ret
	}
}
