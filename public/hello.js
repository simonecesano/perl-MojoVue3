const MyComponent = {
    data() {
	return {
	    messageVisible: true,
	    message: "Hello from Vue!"
	};
    },
    methods: {
	toggleMessage() {
	    this.messageVisible = !this.messageVisible;
	}
    },
    mounted() {
	console.log(this)
    },
    template: `
    <div class="my-component">
      <button @click="toggleMessage">Toggle Message</button>
      <p v-if="messageVisible">{{ message }}</p>
    </div>
  `,
  style: `
    .my-component {
      text-align: center;
      margin: 20px;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 8px;
    }
    .my-component button {
      padding: 8px 16px;
      margin: 10px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: blue;
      color: white;
    }
    .my-component p {
      font-size: 1.2em;
      color: #333;
    }
  `
};

// Export the component to be imported in the main app
export default MyComponent;
