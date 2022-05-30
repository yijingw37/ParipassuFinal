const fakeBodyCount = 3
const fakeBodySteps = 500

// Decorate the head of our guests
Vue.component("obj-head", {
	template: `<a-entity>
		<a-sphere 
			shadow
			:radius="headSize"
			:color="obj.color.toHex()" 
				
			>
			<obj-axes scale=".1 .1 .1" v-if="true" />
		</a-sphere>

		// <a-box v-for="(spike,index) in spikes"
		// 	:depth="headSize*2"
		// 	:height="headSize*.2"
		// 	:width="headSize*2"
		// 	:position="spike.position.toAFrame(0, .2, 0)"
		// 	:rotation="spike.rotation.toAFrame()"
		// 	:color="obj.color.toHex(Math.sin(index))" 
				
		// 	>
		
		// </a-box>
	</a-entity>
	`,
	computed: {
		color() {
			return this.obj.color.toHex?this.obj.color.toHex():this.obj.color
		},
		headSize() {
			return this.obj.size instanceof Vector ? this.obj.size.x : this.obj.size
		},
	},

	data() {
		let spikeCount = 5
		let spikes = []

		for (var i = 0; i < spikeCount; i++) {
			let h = .1
			let spike = new LiveObject(undefined, { 
				size: new THREE.Vector3(h*.2, h, h*.2),
				color: new Vector(noise(i)*30 + 140, 0, 40 + 20*noise(i*3))
			})
			let r = .2
			// Put them on the other side
			let theta = 2*noise(i*10) + 3
			spike.position.setToCylindrical(r, theta, h*.3)
			// Look randomly
			spike.lookAt(0, 3, 0)
			spikes.push(spike)
		}

		return {
			spikes: spikes
		}
	},

	mounted() {
		console.log(this.headSize)
	},
	props: ["obj"]
})


Vue.component("obj-fire", {
	template: `

	<a-entity>
		// <a-sphere 
		// 	color="grey"
		// 	radius=2 
		// 	scale="1 .3 1" 
		// 	roughness=1
		// 	segments-height="5"
		// 	segments-width="10"
		// 	theta-start=0
		// 	theta-length=60
		// 	position="0 -.4 0"
		// 	>
		// </a-sphere>
		<a-sphere
			position="0 1.5 0"
			@click="click"
			:animation="heightAnimation"
			:color="obj.color.toHex()"
			height=1
			radius=".5"

			:scale="(obj.fireStrength*.2 + 1) + ' ' + .1*obj.fireStrength + ' ' + (obj.fireStrength*.2 + 1)"
			:material="fireMaterial">

		</a-sphere>
		<a-sphere
			position="0 1.5 0"
			radius=".5"
			src="#earth"
			@click="click"
			:scale="(obj.fireStrength*.2 + 0.5) + ' ' + (obj.fireStrength*.2 + 0.5) + ' ' + (obj.fireStrength*.2 + 0.5)"
			>
		</a-sphere>
		<a-light
			:animation="intensityAnimation"

			position="0 1 0"
			intensity="500"
			:color="obj.color.toHex()"
			type="point"
			:distance="obj.fireStrength*4 + 10"
			decay="2">
		</a-light>
	</a-entity>

	`,

	// Values computed on the fly
	computed: {
		fireMaterial() {
			return `emissive:${this.obj.color.toHex(.2)}`
		},
		
		animationSpeed() {
			return 500
		},
		intensityAnimation() {
			return `property: intensity; from:.3; to:.6; dir:alternate;dur: ${this.animationSpeed}; easing:easeInOutQuad;loop:true`
		},
		heightAnimation() {
			return `property: height; from:${this.obj.fireStrength};to:${this.obj.fireStrength*2}; dir:alternate;dur: 500; easing:easeInOutQuad;loop:true`
		}
	},

	methods: {
		click() {
			this.obj.fireStrength += 0.5
			this.obj.fireStrength = this.obj.fireStrength%30 + 1

			// Tell the server about this action
			this.obj.post()
		}
	},

	// this function runs once when this object is created
	mounted() {

	},



	props: ["obj"]


})

Vue.component("obj-ball", {
	template: `
	<a-entity>
		<a-sphere
			position="-0.5 1 -2"
			:radius="obj.r"
			src="#chatpet"
			:animation="radiusAnimation"
			>
		</a-sphere>
	</a-entity>

	`,

	// Values computed on the fly
	computed: {
		radiusAnimation() {
			return `property: radius; from:${this.obj.r};to:${this.obj.r*2}; dir:alternate;dur: 1000; easing:easeInOutQuad;loop:true`
		}
	},

	methods: {
	},

	// this function runs once when this object is created
	mounted() {

	},
	props: ["obj"]
})

Vue.component("obj-world", {

	template: `
	<a-entity>
		<!--------- SKYBOX --------->
		<a-sky color="lightblue"></a-sky>
		<a-curvedimage src="#puppy1" height="10" radius="15" theta-length="20" theta-start="-180"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-curvedimage src="#puppy4" height="10" radius="15" theta-length="20" theta-start="-230"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-curvedimage src="#puppy5" height="10" radius="15" theta-length="20" theta-start="-205"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-curvedimage src="#puppy2" height="10" radius="15" theta-length="20" theta-start="-130"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-curvedimage src="#puppy3" height="10" radius="15" theta-length="20" theta-start="-155"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-curvedimage src="#puppy6" height="10" radius="15" theta-length="20" theta-start="-255"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-curvedimage src="#puppy7" height="10" radius="15" theta-length="20" theta-start="-105"
		rotation="0 100 0" scale="1 1 1"></a-curvedimage>
		<a-plane 
			roughness="1"
			shadow 
			color="hsl(140,40%,40%)"
			height="100" 
			width="100" 
			rotation="-90 0 0">
		</a-plane>

		<!---- lights ----> 
		<a-entity light="type: ambient; intensity: 0.4;" color="white"></a-entity>
		<a-light type="directional" 
			position="0 0 0" 
			rotation="-90 0 0" 
			intensity="0.4"
			castShadow target="#directionaltarget">
			<a-entity id="directionaltarget" position="-10 0 -20"></a-entity>
		</a-light>

		<a-cone 
			v-for="(tree,index) in trees"
			:key="'tree' + index"
			shadow 

			:color="tree.color.toHex()"
			:base-radius="tree.size.z" 
			:height="tree.size.y" 

			segments-radial=10
			segments-height=1
			
			:rotation="tree.rotation.toAFrame()"
			:position="tree.position.toAFrame()">
		</a-cone>

		

		// <a-box 
		// 	v-for="(rock,index) in rocks"
		// 	:key="'rock' + index"
		// 	shadow 

		// 	roughness="1"

		// 	:color="rock.color.toHex()"
		// 	:width="rock.size.x" 
		// 	:depth="rock.size.z" 
		// 	:height="rock.size.y" 
			
		// 	:rotation="rock.rotation.toAFrame()"
		// 	:position="rock.position.toAFrame()">
		// </a-box>

	</a-entity>
		`,

	data() {
		// Where we setup the data that this *rendered scene needs*

		// EXAMPLE: Generated landscape
		// Make some random trees and rocks
		// Create a lot of LiveObjects (just as a way 
		//  to store size and color conveniently)
		// Interpret them as whatever A-Frame geometry you want!
		// Cones, spheres, entities with multiple ...things?
		// If you only use "noise" and not "random", 
		// everyone will have the same view. (Wordle-style!)
		let trees = []
		let count = 30
		for (var i = 0; i < count; i++) {
			let h = 6 + 4*noise(i) // Size from 1 to 3
			let tree = new LiveObject(undefined, { 
				size: new THREE.Vector3(.3, h, .3),
				color: new Vector(noise(i*50)*30 + 160, 100, 40 + 10*noise(i*10))
			})
			let r = 20 + 10*noise(i*40)
			let theta = 2*noise(i*10)
			tree.position.setToCylindrical(r, theta, h/2)
			tree.lookAt(0,1,0)
			trees.push(tree)
		}

		let rocks = []
		let rockCount = 100
		for (var i = 0; i < rockCount; i++) {
			let h = 1.2 + noise(i*100) // Size from 1 to 3
			let rock = new LiveObject(undefined, { 
				size: new THREE.Vector3(Math.random()*h, Math.random()*h, Math.random()*h),
				color: new Vector(noise(i)*30 + 140, 0, 40 + 20*noise(i*3))
			})
			let r = 4 + 1*noise(i*100)
			// Put them on the other side
			let theta = noise(i*100) + 3
			rock.position.setToCylindrical(r, theta, h)
			// Look randomly
			rock.lookAt(Math.random()*100,0,Math.random()*100)
			rocks.push(rock)
		}


		return {
			trees: trees,
			rocks: rocks
		}
	},

	mounted() {
		// Create a fire object
		// Attach this liveobject to the ROOM
		// and then the room deals with drawing it to AFRAME
		let fire = new LiveObject(this.room, {
			paritype: "fire",  // Tells it which type to use
			uid: "fire0",
			onUpdate({t, dt, frameCount}) {
				let hue = (noise(t*.02)+1)*180
				Vue.set(this.color.v, 0, hue)
				// console.log(this.color[0] )
			}
		})

		fire.position.set(1, 0, -2)
		fire.fireStrength = 1

		let ball = new LiveObject(this.room, {
			paritype: "ball",  // Tells it which type to use
			uid: "ball0",
			setForce({t, dt, frameCount}) {
				let idNumber = this.uid.hashCode()
				this.f.set(0,0,0)

				let move = Math.max(0,2*noise(t*.12 + idNumber - 1))
				this.f.addPolar(move,20*noise(t*.2 + idNumber))


				if (this.position.length() > 4) {
					this.f.addScaledVector(this.position, -.02)
				}
				// this.position.z = this.height
			}
		})
		ball.r = 0.5;
		
		let grammar = new tracery.createGrammar(  {
			songStyle : ", played as #song.a#, on #musicModifier# #instrument#",
			instrument : ["ukulele", "vocals", "guitar", "clarinet", "piano", "harmonica", "sitar", "tabla", "harp", "dulcimer", "violin", "accordion", "concertina", "fiddle", "tamborine", "bagpipe", "harpsichord", "euphonium"],
			musicModifier : ["heavy", "soft", "acoustic", "psychedelic", "light", "orchestral", "operatic", "distorted", "echoing", "melodic", "atonal", "arhythmic", "rhythmic", "electronic"],
			musicGenre : ["metal", "electofunk", "jazz", "salsa", "klezmer", "zydeco", "blues", "mariachi", "flamenco", "pop", "rap", "soul", "gospel", "buegrass", "swing", "folk"],
			musicPlays : ["echoes out", "reverberates", "rises", "plays"],
			musicAdv : ["too quietly to hear", "into dissonance", "into a minor chord", "changing tempo", "to a major chord", "staccatto", "into harmony", "without warning", "briskly", "under the melody", "gently", "becoming #musicGenre#"],
			song : ["melody", "dirge", "ballad", "poem", "beat poetry", "slam poetry", "spoken word performance", "hymn", "song", "tone poem", "symphony"],
			musicAdj : ["yielding", "firm", "joyful", "catchy", "folksy", "harsh", "strong", "soaring", "rising", "falling", "fading", "frantic", "calm", "childlike", "rough", "sensual", "erotic", "frightened", "sorrowful", "gruff", "smooth"],
        
		}, {})
		grammar.addModifiers(baseEngModifiers)

		const campfireSongs = ["Lonely Goatherd", "On top of spaghetti", "Princess Pat", "BINGO", "Old Mac Donald", "Going on a Bear Hunt", "The Green Grass Grew All Around", "Home on the Range", "John Jacob Jingleheimer Schmitt", "The Wheels on the Bus", "If I had a Hammer"]
		this.room.detailText = "Campfire time!"

		this.room.time.onSecondChange((second) => {
			// Change the song every minute (60 seconds)
			let rate = 10 // How many seconds between changes
			if (second%rate === 0) {
				let tick = second/rate
				let index = second % campfireSongs.length
				let song = campfireSongs[index]
				this.room.detailText =  song + grammar.flatten("#songStyle#")
			}
		})
	},

	props: ["room"]

})

