'use strict';

const spawn = require('child_process').spawn;
const onDeath = require('death');

class BProtocol extends require('stream').Readable {

	constructor(source, options) {

		super(options);

		var commands=[];

		for(let key in source) {

			let value = source[key];

			if(Array.isArray(value)) {

				for(let key2 in value) {
					value[key2] = value[key2].replace(/\s+/g, '\\ ');
				}

				value = value.join(' ');

			} else {
				value = value.replace(/\s+/g, '\\ ');
			}

			commands.push([
				key,
				value
			].join(':'));

		}

		this._source = source = spawn(__dirname + '/rwatcher', [commands.join(';'), 0.1]).stdout;

		source.on('end', () => this.push(null));
		source.on('readable', () => this.read(0));

		onDeath((signal, err) => {
			source.kill();
		});

	}

	_read() {

		var chunk = this._source.read();

		if(chunk === null) {
			return this.push('');
		}

		this.emit(chunk.toString(), null);

		this.push(chunk);

	}

}

module.exports = BProtocol;
