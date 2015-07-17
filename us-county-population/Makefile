CENSUS_COUNTIES_2010 = http://www2.census.gov/geo/tiger/GENZ2010/gz_2010_us_050_00_20m.zip

data/counties.topo.json: data/shp/gz_2010_us_050_00_20m.shp
	topojson -o $@ \
	-- counties=$<

data/shp/gz_2010_us_050_00_20m.shp: data/zip/gz_2010_us_050_00_20m.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/gz_2010_us_050_00_20m.zip:
	mkdir -p $(dir $@)
	wget "$(CENSUS_COUNTIES_2010)" -O $@.download
	mv $@.download $@