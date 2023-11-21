  async createImageDescription(question: string) {

    // const imageDescription = "";
    // Hard coding the API key for easier access

    const response1 = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Based on the question: ${question}', create a detailed text description of an image that visually represents the answer. Focus on key elements, symbols, and colors that are relevant and can be illustrated`,
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });
    const data = await response1.json();

    try {
      // cleaning the response from the api and storing them in variables for later use
      const description = data.choices[0].message.content;
      console.log(description);
      return description;
    } catch {
      console.log("Something went wrong in createImageDescription()");
    }
  }

  async createImage(description: string) {
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.API_KEY}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "prompt": description,
        "n": 1,
        "size": "256x256"
      })
    }

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', options)
      const data = await response.json()
      console.log(data); //url

    } catch (error) {
      console.log(error);
    }
  }
