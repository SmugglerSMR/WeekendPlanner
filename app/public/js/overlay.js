// Overaly functions used in drawing with Map.

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {
	
	var div = document.createElement('div');
	div.style.border = 'solid';
	div.style.borderWidth = '2px';
	div.style.position = 'absolute';

	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	div.appendChild(img);

	this.div_ = div;

	// Add the element to the "overlayImage" pane.
	var panes = this.getPanes();
	panes.overlayImage.appendChild(this.div_);
};

USGSOverlay.prototype.draw = function() {

	// Check image
	if(this.image_ === null) {
		var div = this.div_;
		div.style.left = '-50%';
		div.style.top = '-50%';
		div.style.width = '150px';
		div.style.height = '50px';
		div.innerHTML='<div style="margin-top: 10px;">Change Main City.</div>';
		
		return;
	} 	
	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();

	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

	var left = Math.min(sw.x, ne.x);
	var top = Math.min(sw.y, ne.y);
	var width = Math.abs(sw.x - ne.x);
	var height = Math.abs(sw.y - ne.y);

	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = left.toString() + 'px';
	div.style.top = top.toString() + 'px';
	div.style.width = width.toString() + 'px';
	div.style.height = height.toString() + 'px';
};

USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
};

// Set the visibility to 'hidden' or 'visible'.
USGSOverlay.prototype.hide = function() {
	if (this.div_) {
		// The visibility property must be a string enclosed in quotes.
		this.div_.style.visibility = 'hidden';
	}
};

USGSOverlay.prototype.show = function() {
	if (this.div_) {
		this.div_.style.visibility = 'visible';
	}
};

USGSOverlay.prototype.toggle = function() {
	if (this.div_) {
		if (this.div_.style.visibility === 'hidden') {
		this.show();
		} else {
		this.hide();
		}
	}
};

// Detach the map from the DOM via toggleDOM().
// Note that if we later reattach the map, it will be visible again,
// because the containing <div> is recreated in the overlay's onAdd() method.
USGSOverlay.prototype.toggleDOM = function() {
	if (this.getMap()) {
		// Note: setMap(null) calls OverlayView.onRemove()
		this.setMap(null);
	} else {
		this.setMap(this.map_);
	}
};