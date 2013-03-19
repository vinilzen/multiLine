
/*
 * Jquery  break  Paragraph to multi line
 * EXAMPLE $("p").multiLine();
 */
(function($) {
  $.fn.multiLine = function(indent) {
	var elem = this[ 0 ] || {},
		i = 0,
		l = this.length;

	if (l > 1 ){
		
		try {
			for ( ; i < l; i++ ) {
				elem = this[ i ] || {};
				$(elem).multiLine(indent);
			}
			elem = 0;

		} catch( e ) {}

	} else {
		if ( l==1 ) {
			var size_table = {},
				tagName = $(elem).prop('tagName'),
				width = $(elem).width(),
				text = $(elem).text(),
				chars = text.split(''),
				indent = parseInt( $(elem).css('text-indent') );

			if (text.length > 0){

				// померяем размеры всех букв
				for (var i = 0; i<chars.length; i++){
					if ( typeof(size_table[chars[i]]) == 'undefined'){
						size_table[chars[i]] = get_letter_param(chars[i], elem, indent);
					}
				}

				$(elem).html('').width(width+'px').css('text-indent',0);

				words = text.split(' ');
				var span = '';

				// подбираем сколько слов влазит в строку и вставляем span-сроку
				while (words.length > 0){
					var word = words.shift();
					var test_string = (span == '')?word:span+' '+word;

					var parent_width =	(indent!=0 && $(elem).html() == '')
										?
										$(elem).parent().width()-indent
										:
										$(elem).parent().width();

					if (get_width(test_string, size_table) > parent_width){

						
						
						if (indent!=0 && $(elem).html() == '') {
							$('<span />').html(span+' ').appendTo(elem).css('padding-left',indent+'px');
						} else {
							$('<span />').html(span+' ').appendTo(elem);
						}

						span = '';
						words.unshift(word);

					} else {

						if (words.length == 0){
							$('<span />').html(test_string+' ').appendTo(elem);
						}

						span = test_string;
					}
				}
			}
		} else {
			console.log('Не найден элемент');
			return this;
		}
	}

  	return this;
  }
})(jQuery);

function get_letter_param(l, container, indent){
	
	if (l == ' '){
		l = '&nbsp;'
	}

	var width = parseInt($(container).html(l)
									.css({'display':'inline-block','width':'auto'})
									.width()) - indent;

	var height = $(container).html(l)
							.css({'display':'inline-block'})
							.height()

	return [width, height];
}

function get_width(str, size_table){
	var chars = str.split('');
	var sum = 0;

	for (var i = 0; i<chars.length; i++){

		if ( typeof(size_table[chars[i]]) == 'object' && size_table[chars[i]].length == 2 ){
			sum = sum + size_table[chars[i]][0];
		} else {
			console.log('Нет размеров у этой буквы');
		}
	}
	return sum;
}