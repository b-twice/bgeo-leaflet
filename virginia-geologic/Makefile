VIRGINIA_GEOLOGY = http://pubs.usgs.gov/of/2005/1325/data/VAgeol_dd.zip

data/zip/VAgeol_dd.zip:
	mkdir -p $(dir $@)
	wget "$(VIRGINIA_GEOLOGY)" -O $@.download
	mv $@.download $@

data/shp/VAgeol_dd.shp: data/zip/VAgeol_dd.zip
	mkdir -p $(dir $@)
	unzip -d shp $<
	touch $@

data/geology_geo.json:data/shp/vageol_poly_dd.shp
	ogr2ogr -f GeoJSON \
	$@ $<

data/geology_topo.json:data/geology_geo.json
	topojson -o $@ \
	-- \
	$<