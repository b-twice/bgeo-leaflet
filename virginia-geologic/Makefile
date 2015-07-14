VIRGINIA_GEOLOGY = http://pubs.usgs.gov/of/2005/1325/data/VAgeol_dd.zip

data/geology_topo.json:data/geology_geo.json
	topojson -o $@ \
	-p ORIG_LABEL,UNIT_AGE,ROCKTYPE1,ROCKTYPE2 \
	-- \
	$<

data/geology_geo.json:data/shp/vageol_poly_dd.shp
	ogr2ogr -f GeoJSON \
	$@ $<

data/shp/vageol_poly_dd.shp: data/zip/vageol_dd.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/vageol_dd.zip:
	mkdir -p $(dir $@)
	wget "$(VIRGINIA_GEOLOGY)" -O $@.download
	mv $@.download $@

