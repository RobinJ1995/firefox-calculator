var calc;
var foxtailBgPositionX = 0;

$(document).ready
(
	function ()
	{
		calc = new Calculator ();
		
		//calc.setLogElement ('log');
		setInterval (foxtailCycle, 100);
		
		$('.digitButton').click
		(
			function ()
			{
				if ($(this).hasClass ('buttonDisabled'))
					return;
				
				var val = $(this).attr ('data-value');
				$('#screen').html (calc.numberAppend (val));
				enableButtons ('actionButton');
			}
		);
		$('#btnDot').click
		(
			function ()
			{
				if ($(this).hasClass ('buttonDisabled'))
					return;
				
				$('#screen').html (calc.numberAppend ('.'));
				disableButton ('btnDot');
			}
		);
		$('.actionButton').click
		(
			function ()
			{
				if ($(this).hasClass ('buttonDisabled'))
					return;
				
				var act = $(this).attr ('data-action');
				$('#screen').html (calc.action (act));
				
				if ($(this).is ('#btnCalculate'))
				{
					disableButtons ('digitButton');
					disableButton ('btnDot');
				}
				else
				{
					enableButtons ('digitButton');
					enableButton ('btnDot');
				}
			}
		);
		$('#btnC').click
		(
			function ()
			{
				if ($(this).hasClass ('buttonDisabled'))
					return;
				
				$('#screen').html (calc.reset ());
				calc.clearLog ();
				resetButtons ();
			}
		);
		$('#btnCE').click
		(
			function ()
			{
				if ($(this).hasClass ('buttonDisabled'))
					return;
				
				$('#screen').html (calc.resetNumber ());
				resetButtons ();
			}
		);
	}
);

function foxtailCycle ()
{
	var foxtail = document.getElementById ('foxtail');
	foxtailBgPositionX += 156;
	if (foxtailBgPositionX >= 7020)
		foxtailBgPositionX = 0;
	
	foxtail.style.backgroundPosition = foxtailBgPositionX + 'px 0px';
}

function enableButton (element)
{
	var button = document.getElementById (element);
	button.className = replaceAll (button.className, 'buttonDisabled', '');
}

function enableButtons (elements)
{
	var buttons = document.getElementsByClassName (elements);
	for (var i = 0; i < buttons.length; i++)
		buttons[i].className = replaceAll (buttons[i].className, 'buttonDisabled', '');
}

function disableButton (element)
{
	var button = document.getElementById (element);
	button.className  += ' buttonDisabled';
}

function disableButtons (elements)
{
	var buttons = document.getElementsByClassName (elements);
	for (var i = 0; i < buttons.length; i++)
		buttons[i].className += ' buttonDisabled';
}

function resetButtons ()
{
	enableButtons ('button');
	disableButtons ('actionButton');
	enableButton ('btnSubstract');
}

function replaceAll (str, search, replace)
{
	while (str.indexOf (search) !== -1)
		str = str.replace (search, replace);
	
	return str;
}