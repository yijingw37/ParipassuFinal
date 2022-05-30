
AFRAME.registerComponent('rotation-reader', {
  /**
   * We use IIFE (immediately-invoked function expression) to only allocate one
   * vector or euler and not re-create on every tick to save memory.
   */
	tick: (function () {
		
		return function () {
			if (room.userHead) {
				room.userHead.position.copy(this.el.object3D.position)
				room.userHead.rotation.copy(this.el.object3D.rotation)
			}

		};
	})()
});

Vue.component("room-scene", {
	template: `<a-scene>

		
		<!--------- ASSETS ---------->
		<a-assets>
			<img id="sky" crossOrigin="anonymous" src="img/textures/sky-night.png">
			<img id="puppy1" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/puppy1.jpg?v=1653938042524">
			<img id="puppy2" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/Puppy2.png?v=1653938276497">
			<img id="puppy3" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/puppy3.jpg?v=1653937444176">
			<img id="puppy4" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/puppy4.jpg?v=1653937444571">
			<img id="puppy5" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/puppy5.jpg?v=1653937444778">
			<img id="puppy6" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/puppy6.jpg?v=1653938939876">
			<img id="puppy7" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/puppy7.jpg?v=1653939059695">
			<img id="earth" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/pinkStrip.png?v=1651179624008">
			<img id="chatpet" crossOrigin="anonymous" src="https://cdn.glitch.global/2a3c8a33-ddcb-41e4-9d0c-e43c923a4c1b/pinkBubble.jpg?v=1651198693895">
		</a-assets>

		<!--------- CAMERA --------->

		<a-camera id="camera" rotation-reader>
			<a-cursor></a-cursor>

			<!-------- Output text ----->
			<a-text 
				v-if="room.userHead"
				width=".8"
				color="black"
				:value="room.userHead.position.toFixed(2)" 
				position="-.7 .7 -1">
			</a-text>
			
			<a-text 
				width="2"
				color="black"
				:value="room.titleText" 
				position="-.7 .6 -1">
			</a-text>
			<a-text 
				width="1"
				color="black"
				:value="room.detailText" 
				position="-.7 .5 -1">
			</a-text>
			
		</a-camera>
		
		<obj-world :room="room" />


		
				
		<a-entity position="0 0 0">
			<a-entity text="value:hello;font:/fonts/helvetica-sdf.fnt; fontImage:/fonts/helvetica-sdf.png;width:10;color:black" position="0 1 0"></a-entity>
			
			<!--------- ALL THE OBJECTS YOU'VE MADE --------->
			<live-object  v-for="obj in room.objects" :key="obj.uid" :obj="obj" v-if="obj.room.userHead !== obj" />
		</a-entity>


	</a-scene>`,

	methods: {
		camtick() {
			console.log("cam")
		}
	},
	mounted() {
		// Create 
	},

	data() {
		return  {
			
		}
	},

	props: ["room"],
})