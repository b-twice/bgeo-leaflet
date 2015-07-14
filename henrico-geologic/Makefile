VIRGINIA_GEOLOGY = http://pubs.usgs.gov/of/2005/1325/data/VAgeol_dd.zip
VIRGINIA_CENSUS = http://www2.census.gov/geo/tiger/GENZ2014/shp/cb_2014_us_county_500k.zip

data/henrico_geology.topo.json: data/shp/henrico_geol_poly_dd.shp data/shp/cb_2014_us_henrico_500k.shp
	topojson -o $@ \
	-p ORIG_LABEL,UNIT_AGE,ROCKTYPE1,ROCKTYPE2 \
	-- \
	geology=data/shp/henrico_geol_poly_dd.shp \
	henrico=data/shp/cb_2014_us_henrico_500k.shp

data/shp/henrico_geol_poly_dd.shp: data/shp/vageol_poly_dd.shp data/shp/cb_2014_us_henrico_500k.shp
	ogr2ogr -f "ESRI Shapefile" \
	-clipsrc data/shp/cb_2014_us_henrico_500k.shp \
	$@ $<

data/shp/cb_2014_us_henrico_500k.shp: data/shp/cb_2014_us_county_500k.shp
	ogr2ogr -f "ESRI Shapefile" \
	-where "NAME IN ('Henrico')" \
	$@ $<

data/shp/vageol_poly_dd.shp: data/zip/vageol_dd.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/shp/cb_2014_us_county_500k.shp: data/zip/cb_2014_us_county_500k.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/vageol_dd.zip:
	mkdir -p $(dir $@)
	wget "$(VIRGINIA_GEOLOGY)" -O $@.download
	mv $@.download $@

data/zip/cb_2014_us_county_500k.zip:
	mkdir -p $(dir $@)
	wget "$(VIRGINIA_CENSUS)" -O $@.download
	mv $@.download $@