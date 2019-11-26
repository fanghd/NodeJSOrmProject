Array.prototype._order = function (_order, _key) {
    const sta_time = new Date().getTime();
    var i = this.length - 1;
    _order = _order || 'asc';
    while (i > 0) {
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if (_key) {
                if (_order == 'asc' && this[j][_key] > this[j + 1][_key] || _order == 'desc' && this[j][_key] < this[j + 1][_key]) {
                    pos = j;
                    var temp = this[j];
                    this[j] = this[j + 1];
                    this[j + 1] = temp;
                }
            } else {
                if (_order == 'asc' && this[j] > this[j + 1] || _order == 'desc' && this[j] < this[j + 1]) {
                    pos = j;
                    var temp = this[j];
                    this[j] = this[j + 1];
                    this[j + 1] = temp;
                }
            }
        }
        i = pos;
    }
    const end_time = new Date().getTime()
    console.log(`order time using: ${end_time - sta_time}ms`)
    return this;
}