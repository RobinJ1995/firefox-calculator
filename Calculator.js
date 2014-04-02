function Calculator ()
{
	this._currentNumber = '';
	this._action = void 0;
	this._otherNumber = void 0;
	this._log = '';
	this._logElement = void 0;
	
	this.numberAppend = function (str)
	{
		this._currentNumber += str.toString ();
		
		return this.getNumber ();
	}
	
	this.numberAppendDot = function ()
	{
		var r = this.numberAppend ('.');
	}

	this.getNumber = function ()
	{
		return parseFloat (this._currentNumber);
	}
	
	this.resetNumber = function ()
	{
		this._currentNumber = '';
		
		return this.getNumber ();
	}
	
	this.reset = function ()
	{
		this._currentNumber = '';
		this._action = void 0;
		this._otherNumber = void 0;
		
		return this.getNumber ();
	}
	
	this.action = function (what)
	{
		var recognisedActions = [ 'add', 'substract', 'multiply', 'divide', 'calculate' ];
		
		if (this.noNumbers () && (what == 'substract'))
			return this.numberAppend ('-');
		
		if ((this._currentNumber !== '') && (this._otherNumber !== void 0))
			this.calculate ();
		
		if (what == 'calculate')
		{
			this._action = void 0;
			this._otherNumber = void 0;
			
			return this.getNumber ();
		}
		else
		{
			if (! ((this._currentNumber === '') && (this._otherNumber !== void 0)))
				this._otherNumber = this.getNumber ();
			
			if (recognisedActions.indexOf (what) >= 0)
				this._action = what;
			else
				throw 'Unrecognised action';
			
			this.resetNumber ();
			
			return this._otherNumber;
		}
	}
	
	this.getAction = function ()
	{
		return this._action;
	}
	
	this.getActionSymbol = function ()
	{
		var actions = [ 'add', 'substract', 'multiply', 'divide', 'calculate' ];
		var symbols = [ '+', '-', '*', '/', '=' ];
		
		return symbols[actions.indexOf (this.getAction ())];
	}
	
	this.calculate = function ()
	{
		var formula = this._otherNumber.toString () + this.getActionSymbol () + this.getNumber ().toString ();
		var result = parseFloat (eval (formula));
		this._currentNumber = result;
		
		this.log (formula + ' = ' + result);
		
		return result;
	}
	
	this.log = function (message)
	{
		this._log += message + '<br />';
		
		if (this._logElement !== void 0)
			this.updateLog ();
	}
	
	this.setLogElement = function (element)
	{
		this._logElement = element;
		this.updateLog ();
	}
	
	this.clearLog = function ()
	{
		this._log = '';
		this.updateLog ();
	}
	
	this.updateLog = function ()
	{
		document.getElementById (this._logElement).innerHTML = this._log;
	}
	
	this.noNumbers = function ()
	{
		return ((this._currentNumber === '') && (this._otherNumber === void 0));
	}
}