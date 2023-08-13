<template>
  <a-card>
    <l-map
      v-if="!loaded"
      :zoom="map.zoom"
      :center="map.center"
      :max-zoom="map.maxZoom"
      :min-zoom="map.minZoom"
      
      style="height: 550px; width: 100%"
    >
      <l-tile-layer
          :url="map.tileLayer"
          :attribution="map.attribution"
      />
      <l-marker
        v-for="(d, i) in maps"
        :key="i"
        :lat-lng="[Number(d.location_latitude), Number(d.location_longitude)]"
      >
      <l-icon 
          :icon-size="[32, 32]"
          :icon-anchor="[16, 32]"
          :popup-anchor="[0, -32]"
          :icon-url="d.icons"
        />
        <l-popup width="560" height="315">
          <div v-if="d.subkategori === 'umkm'" class="text-center">
            <img src="pages/marker/Market.jpg" width="200-px" height="100px" class="img-fluid" />
            <div class="text-center">
            <h5>{{ d.LAPORAN }}</h5>
            <p>{{ d.PEGAWAI.ALAMAT }}</p>
            <p>{{ d.ALAMAT }}</p>
          </div>
          </div>
          <div v-else class="text-center">
            <img :src="`${map.baseImg}/${d.map_image_url}`" class="img-fluid" />
          </div>
          <div class="text-center">
            <h5>{{ d.name }}</h5>
            <p>{{ d.description_point }}</p>
            <p>{{ d.address }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </a-card>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from "vue2-leaflet";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup
  },
  data() {
    return {
      loaded: false,
      map: {
        tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '<a href="https://onecenterpesawaran.psti-ubl.id">one centre pesawaran</a> contributors',
        center: [-5.398909, 105.070861],
        zoom: 10,
        minZoom: 7,
        maxZoom: 18,
        baseImg: 'https://gis.pesawarankab.go.id',
        icons : "",
      },
      maps: []
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData () {
      this.$loading(true)
      this.loaded = true;
      try {
        const response = await this.$axios.get('opd/get-lokasi')
        if (response.data.status === true ) {
          console.log(response.data.status);
          response.data.data["Kantor Bupati"].forEach((marker) => {
            marker.icons = "https://gis.pesawarankab.go.id/upload/resize/logo2.png"
            this.maps.push(marker);
          });
          response.data.data["OPD"].forEach((marker) => {
            marker.icons = "https://gis.pesawarankab.go.id/upload/resize/logo2.png"
            this.maps.push(marker);
          });
          response.data.data["Kecamatan"].forEach((marker) => {
            marker.icons = "https://gis.pesawarankab.go.id/upload/resize/logo2.png"
            this.maps.push(marker);
          });
          response.data.data["Desa"].forEach((marker) => {
            marker.icons = "https://gis.pesawarankab.go.id/upload/resize/logo2.png"
            this.maps.push(marker);
          });
          response.data.data["Pulau"].forEach((marker) => {
            marker.icons = "images/marker/pulau.png"
            this.maps.push(marker);
          });
          response.data.data["Pantai"].forEach((marker) => {
            marker.icons = "images/marker/Pantai-baru1.png"
            this.maps.push(marker);
          });
        } else {
          const umkm = await this.$axios.get('https://app-report-api.psti-ubl.id/api/9d59b4ea-0851-4ff4-946a-31ccc117761b/laporan?page=1&rowsPerPage=1000&rowsNumber=0')
          if (umkm.data.status === true) {
            umkm.data.result.data.forEach((marker) => {
              marker.subkategori = "umkm"
              marker.location_latitude = marker.LOCATION.LAT
              marker.location_longitude = marker.LOCATION.LONG
              marker.icons = "images/marker/market-baru.png"
              this.maps.push(marker);
            });
          }
        }
      } catch (e) {
        this.$commonErrorNotif()
      } finally {
        this.loaded = false
        this.$loading(false)
      }
    },
  },
};
</script>

<style scoped>
</style>