// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const clearChatButton = document.getElementById('clear-chat');
const toggleThemeButton = document.getElementById('toggle-theme');
const quickActionButtons = document.querySelectorAll('.quick-action-btn');
const featureCards = document.querySelectorAll('.feature-card');

// Configuration
const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Climate change quizzes
const quizzes = {
    'basic_quiz': {
        title: 'Basic Climate Change Quiz',
        questions: [
            {
                question: 'What is the main cause of global warming?',
                options: ['Greenhouse gases', 'Solar flares', 'Volcanic eruptions', 'Ocean currents'],
                correct: 0,
                explanation: 'Greenhouse gases trap heat in Earth\'s atmosphere, leading to global warming. While solar flares, volcanic eruptions, and ocean currents can affect climate, they are not the main cause of the current global warming trend.'
            },
            {
                question: 'Which of these is a renewable energy source?',
                options: ['Coal', 'Natural gas', 'Solar power', 'Oil'],
                correct: 2,
                explanation: 'Solar power is a renewable energy source that harnesses energy from the sun. Coal, natural gas, and oil are all fossil fuels, which are non-renewable.'
            },
            {
                question: 'What is the primary greenhouse gas?',
                options: ['Methane', 'Carbon dioxide', 'Nitrous oxide', 'Water vapor'],
                correct: 1,
                explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas contributing to global warming. While methane and nitrous oxide are also potent greenhouse gases, CO2 is the most significant due to its abundance and long atmospheric lifetime.'
            }
        ]
    },
    'impact_quiz': {
        title: 'Climate Change Impacts Quiz',
        questions: [
            {
                question: 'How does climate change affect sea levels?',
                options: ['They decrease', 'They remain the same', 'They rise', 'They fluctuate randomly'],
                correct: 2
            },
            {
                question: 'Which of these is NOT a consequence of climate change?',
                options: ['More extreme weather', 'Rising temperatures', 'Decreasing ocean acidity', 'Melting ice caps'],
                correct: 2
            }
        ]
    }
};

// Climate change scenarios
const scenarios = {
    'carbon_footprint': {
        title: 'Carbon Footprint Scenario',
        description: 'You\'re planning a family vacation. How can you reduce your carbon footprint?',
        options: [
            {
                choice: 'Take a long-distance flight',
                impact: 'High carbon footprint - Air travel has a significant environmental impact.',
                alternative: 'Consider taking a train or bus for shorter distances, or choose a closer destination.'
            },
            {
                choice: 'Drive in a fuel-efficient car',
                impact: 'Medium carbon footprint - Better than flying but still significant.',
                alternative: 'Consider carpooling or using public transportation when possible.'
            },
            {
                choice: 'Take a train or bus',
                impact: 'Lower carbon footprint - Public transportation is more environmentally friendly.',
                alternative: 'Great choice! This is one of the most sustainable options.'
            }
        ]
    },
    'energy_choices': {
        title: 'Home Energy Choices',
        description: 'You\'re renovating your home. What energy choices will you make?',
        options: [
            {
                choice: 'Install solar panels',
                impact: 'Positive impact - Renewable energy reduces carbon emissions.',
                alternative: 'Excellent choice! Consider also adding energy-efficient appliances.'
            },
            {
                choice: 'Use traditional heating',
                impact: 'High carbon footprint - Traditional heating often uses fossil fuels.',
                alternative: 'Consider heat pumps or solar heating systems for better efficiency.'
            }
        ]
    }
};

// Local fallback responses with enhanced information
const fallbackResponses = {
    'what is climate change': 'Climate change refers to long-term shifts in temperatures and weather patterns. Since the 1800s, human activities have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil, and gas, which produces heat-trapping gases.\n\nKey points:\n1. Global temperatures are rising\n2. Ice caps are melting\n3. Sea levels are rising\n4. Weather patterns are changing\n5. Ecosystems are being affected',
    
    'how can i reduce my carbon footprint': 'Here are practical ways to reduce your carbon footprint:\n\n1. Energy at Home:\n   - Use energy-efficient appliances\n   - Switch to LED lights\n   - Properly insulate your home\n   - Use smart thermostats\n\n2. Transportation:\n   - Use public transport\n   - Carpool when possible\n   - Consider electric vehicles\n   - Walk or bike for short trips\n\n3. Food Choices:\n   - Eat more plant-based foods\n   - Buy local and seasonal produce\n   - Reduce food waste\n   - Compost organic waste\n\n4. Shopping Habits:\n   - Buy second-hand when possible\n   - Choose sustainable products\n   - Reduce plastic use\n   - Support eco-friendly brands',
    
    'what are renewable energy sources': 'Renewable energy sources include:\n\n1. Solar Power:\n   - Photovoltaic panels\n   - Solar thermal systems\n   - Benefits: Clean, abundant, low maintenance\n\n2. Wind Power:\n   - Onshore wind farms\n   - Offshore wind farms\n   - Benefits: No emissions, cost-effective\n\n3. Hydropower:\n   - Dams and reservoirs\n   - Run-of-river systems\n   - Benefits: Reliable, flexible output\n\n4. Geothermal Energy:\n   - Heat from Earth\'s core\n   - Used for heating and electricity\n   - Benefits: Constant, reliable source\n\n5. Biomass:\n   - Organic materials\n   - Wood, agricultural waste\n   - Benefits: Renewable, reduces waste',
    
    'what is the greenhouse effect': 'The greenhouse effect is a natural process that warms the Earth\'s surface. Here\'s how it works:\n\n1. Sunlight reaches Earth\n2. Some energy is reflected back to space\n3. Some is absorbed and re-radiated as heat\n4. Greenhouse gases trap this heat\n5. This keeps Earth warm enough for life\n\nHuman activities are enhancing this effect by:\n- Burning fossil fuels\n- Deforestation\n- Industrial processes\n- Agricultural practices',
    
    'how does climate change affect our planet': 'Climate change affects our planet in many ways:\n\n1. Temperature Changes:\n   - Rising global temperatures\n   - More heat waves\n   - Changing seasonal patterns\n\n2. Water Systems:\n   - Melting ice caps\n   - Rising sea levels\n   - Changing precipitation patterns\n\n3. Weather Events:\n   - More frequent storms\n   - Increased flooding\n   - More severe droughts\n\n4. Ecosystems:\n   - Habitat loss\n   - Species extinction\n   - Changing migration patterns\n\n5. Human Impact:\n   - Food security threats\n   - Health risks\n   - Economic challenges',
    
    'what can i do to help': 'You can help combat climate change through these actions:\n\n1. Personal Actions:\n   - Reduce energy use\n   - Use sustainable transport\n   - Eat more plant-based foods\n   - Reduce waste\n\n2. Community Actions:\n   - Join local environmental groups\n   - Participate in clean-up events\n   - Support local initiatives\n\n3. Policy Support:\n   - Vote for climate-friendly policies\n   - Support renewable energy\n   - Advocate for change\n\n4. Education:\n   - Learn about climate science\n   - Share knowledge with others\n   - Stay informed about solutions',
    
    'what is global warming': 'Global warming is the long-term heating of Earth\'s climate system observed since the pre-industrial period due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth\'s atmosphere.\n\nKey aspects:\n1. Temperature rise\n2. Human influence\n3. Greenhouse gases\n4. Climate system changes\n5. Long-term trends',
    
    'what are the main causes of climate change': 'The main causes of climate change are:\n\n1. Fossil Fuel Burning:\n   - Coal, oil, and gas\n   - Transportation\n   - Electricity generation\n\n2. Deforestation:\n   - Loss of carbon sinks\n   - Reduced biodiversity\n   - Soil degradation\n\n3. Industrial Processes:\n   - Manufacturing\n   - Construction\n   - Mining\n\n4. Agricultural Practices:\n   - Livestock production\n   - Fertilizer use\n   - Land use changes\n\n5. Waste Management:\n   - Landfill emissions\n   - Waste incineration\n   - Plastic pollution'
};

// Climate change context for the AI
const systemPrompt = `You are a Climate Change Educator AI assistant. Your role is to:
1. Provide accurate, science-based information about climate change
2. Explain complex climate concepts in simple terms
3. Suggest practical actions people can take to reduce their carbon footprint
4. Stay focused on climate-related topics
5. Be informative, engaging, and encouraging

Key topics you should be knowledgeable about:
- Greenhouse effect and global warming
- Renewable energy sources
- Carbon footprint reduction
- Sustainable living practices
- Climate change impacts
- Environmental conservation
- Climate policy and international agreements`;

// Initialize chat history
let chatHistory = [
    { role: 'system', content: systemPrompt }
];

// Theme handling
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();

// Auto-resize textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
});

// Send message on Enter (but allow Shift+Enter for new line)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Clear chat
clearChatButton.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    addBotMessage('Chat cleared. How can I help you today?');
});

// Toggle theme
toggleThemeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Quick action buttons
quickActionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        handleQuickAction(action);
    });
});

// Feature cards
featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const feature = card.querySelector('span').textContent.toLowerCase();
        handleFeatureClick(feature);
    });
});

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleThemeButton.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addUserMessage(message);
        userInput.value = '';
        userInput.style.height = 'auto';
        processUserMessage(message);
    }
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleQuickAction(action) {
    switch (action) {
        case 'quiz':
            addBotMessage('Let\'s test your knowledge! Here\'s a question: What is the main cause of global warming?');
            break;
        case 'scenario':
            addBotMessage('Imagine you\'re a city planner. How would you make your city more sustainable?');
            break;
        case 'tips':
            addBotMessage('Here are some daily tips to reduce your carbon footprint:\n1. Use public transport or carpool\n2. Reduce meat consumption\n3. Save energy at home\n4. Reduce, reuse, recycle');
            break;
    }
}

function handleFeatureClick(feature) {
    switch (feature) {
        case 'information':
            addBotMessage('I can provide information about climate change, its causes, effects, and solutions. What specific topic would you like to learn about?');
            break;
        case 'quizzes':
            addBotMessage('Let\'s test your knowledge! Would you like to start with a basic or advanced quiz?');
            break;
        case 'scenarios':
            addBotMessage('I can present you with different climate change scenarios. Would you like to explore:\n1. Future predictions\n2. Impact on different regions\n3. Adaptation strategies');
            break;
        case 'solutions':
            addBotMessage('I can help you understand various solutions to climate change:\n1. Individual actions\n2. Community initiatives\n3. Global policies\n4. Technological innovations');
            break;
    }
}

function validateQuizAnswer(question, userAnswer) {
    // Convert both the correct answer and user answer to lowercase for comparison
    const correctAnswer = question.options[question.correct].toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase().trim();
    
    // Check if the answer is correct
    const isCorrect = userAnswerLower === correctAnswer;
    
    // Get the full correct answer text for display
    const correctAnswerText = question.options[question.correct];
    
    let feedback = '';
    if (isCorrect) {
        feedback = `✅ Correct! "${correctAnswerText}" is the right answer.`;
    } else {
        feedback = `❌ Not quite. The correct answer is "${correctAnswerText}".`;
        // Add explanation if available
        if (question.explanation) {
            feedback += `\n\n${question.explanation}`;
        }
    }
    
    return {
        isCorrect,
        feedback,
        correctAnswer: correctAnswerText
    };
}

function validateScenarioChoice(scenario, choiceIndex) {
    const choice = scenario.options[choiceIndex];
    if (!choice) return null;

    return {
        choice: choice.choice,
        impact: choice.impact,
        alternative: choice.alternative,
        feedback: `You chose: ${choice.choice}\n\nImpact: ${choice.impact}\n\nSuggestion: ${choice.alternative}`
    };
}

function getGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    return greeting;
}

function clearChat() {
    chatMessages.innerHTML = '';
    chatHistory = [
        { role: 'system', content: systemPrompt }
    ];
    
    const greeting = getGreeting();
    const welcomeMessage = `Hii! 👋 ${greeting}! I'm your friendly Climate Change Educator. I'm here to help you learn about our planet in a fun and engaging way! 🌍\n\n` +
        `I can help you with:\n\n` +
        `1. 📚 Learning about climate change\n` +
        `2. 🎯 Taking interactive quizzes\n` +
        `3. 🌟 Exploring real-world scenarios\n` +
        `4. 💡 Discovering solutions\n\n` +
        `What would you like to explore today?`;
    
    addBotMessage(welcomeMessage);
}

// Add this new function after the existing functions
function handleQuestion(question) {
    const questions = {
        'what is global warming': {
            response: `Global warming is the long-term heating of Earth's climate system. Here's what you need to know:

1. 🌡️ Definition:
   - Gradual increase in Earth's temperature
   - Caused by human activities
   - Part of climate change

2. 🎯 Main Causes:
   - Greenhouse gas emissions
   - Burning fossil fuels
   - Deforestation
   - Industrial activities

3. 🌍 Effects:
   - Rising temperatures
   - Melting ice caps
   - Rising sea levels
   - Extreme weather events

Would you like to learn more about any specific aspect of global warming?`
        },
        'how to reduce carbon footprint': {
            response: `Here are practical ways to reduce your carbon footprint:

1. 🏠 At Home:
   - Use energy-efficient appliances
   - Switch to LED lights
   - Properly insulate your home
   - Use smart thermostats

2. 🚗 Transportation:
   - Use public transport
   - Carpool when possible
   - Consider electric vehicles
   - Walk or bike for short trips

3. 🍽️ Food Choices:
   - Eat more plant-based foods
   - Buy local and seasonal produce
   - Reduce food waste
   - Compost organic waste

4. 🛍️ Shopping:
   - Buy second-hand when possible
   - Choose sustainable products
   - Reduce plastic use
   - Support eco-friendly brands

Would you like specific tips for any of these areas?`
        },
        'what are renewable energy sources': {
            response: `Renewable energy sources include:

1. ☀️ Solar Power:
   - Photovoltaic panels
   - Solar thermal systems
   - Benefits: Clean, abundant, low maintenance

2. 💨 Wind Power:
   - Onshore wind farms
   - Offshore wind farms
   - Benefits: No emissions, cost-effective

3. 💧 Hydropower:
   - Dams and reservoirs
   - Run-of-river systems
   - Benefits: Reliable, flexible output

4. 🌋 Geothermal Energy:
   - Heat from Earth's core
   - Used for heating and electricity
   - Benefits: Constant, reliable source

5. 🌱 Biomass:
   - Organic materials
   - Wood, agricultural waste
   - Benefits: Renewable, reduces waste

Would you like to know more about any of these energy sources?`
        }
    };

    // Convert question to lowercase and remove question marks
    const cleanQuestion = question.toLowerCase().replace('?', '').trim();
    
    // Check for matches in the questions object
    for (const [key, value] of Object.entries(questions)) {
        if (cleanQuestion.includes(key)) {
            return value.response;
        }
    }
    
    // If no match found, return a default response
    return `I understand you're asking about "${question}". While I don't have a specific answer for that, I can help you with:
1. What is global warming?
2. How to reduce your carbon footprint
3. Renewable energy sources

What would you like to learn about?`;
}

// Update the processUserMessage function to use the new question handling
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Handle greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good (morning|afternoon|evening))$/i)) {
        const greeting = getGreeting();
        addBotMessage(`Hii! 👋 ${greeting}! I'm your friendly Climate Change Educator. I'm excited to chat with you about our planet! 🌍\n\n` +
            `What would you like to explore today?\n\n` +
            `1. 📚 Learn about climate change\n` +
            `2. 🎯 Take a quiz\n` +
            `3. 🌟 Try a scenario\n` +
            `4. 💡 Get practical tips`);
        return;
    }
    
    // Handle goodbyes
    if (lowerMessage.match(/^(bye|goodbye|see you|farewell|exit|quit)$/i)) {
        addBotMessage(`Bye! 👋 It was great chatting with you! Come back anytime to learn more about climate change. Take care! 🌍`);
        return;
    }
    
    // Check if we're in a quiz or scenario
    const currentQuiz = window.currentQuiz;
    const currentScenario = window.currentScenario;

    if (currentQuiz) {
        const result = validateQuizAnswer(currentQuiz.currentQuestion, message);
        addBotMessage(result.feedback);
        
        if (result.isCorrect) {
            currentQuiz.score++;
        }
        
        // Move to next question or end quiz
        currentQuiz.currentQuestionIndex++;
        if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
            currentQuiz.currentQuestion = currentQuiz.questions[currentQuiz.currentQuestionIndex];
            setTimeout(() => {
                const options = currentQuiz.currentQuestion.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n');
                addBotMessage(`Next question: ${currentQuiz.currentQuestion.question}\n\nOptions:\n${options}`);
            }, 1000);
        } else {
            // End of quiz
            const percentage = (currentQuiz.score / currentQuiz.questions.length) * 100;
            addBotMessage(`Great job! 🎉 Your score: ${currentQuiz.score}/${currentQuiz.questions.length} (${percentage}%)\n\nWould you like to try another quiz?`);
            window.currentQuiz = null;
        }
    } else if (currentScenario) {
        const choiceIndex = parseInt(message) - 1;
        const result = validateScenarioChoice(currentScenario, choiceIndex);
        
        if (result) {
            addBotMessage(result.feedback);
            // End scenario
            addBotMessage("Would you like to try another scenario?");
            window.currentScenario = null;
        } else {
            addBotMessage("Please select a valid option (1-" + currentScenario.options.length + ")");
        }
    } else {
        // Check if the message is a quiz answer
        const quizAnswer = lowerMessage;
        if (quizAnswer === 'greenhouse gases' || 
            quizAnswer === 'solar flares' || 
            quizAnswer === 'volcanic eruptions' || 
            quizAnswer === 'ocean currents') {
            
            const isCorrect = quizAnswer === 'greenhouse gases';
            const feedback = isCorrect ? 
                '✅ Correct! Greenhouse gases are the main cause of global warming.' :
                '❌ Not quite. The main cause of global warming is greenhouse gases.';
            
            addBotMessage(feedback);
        } else {
            // Handle questions
            const response = handleQuestion(message);
            addBotMessage(response);
        }
    }
}

function startQuiz(quizId) {
    const quiz = quizzes[quizId];
    if (!quiz) return;

    window.currentQuiz = {
        questions: quiz.questions,
        currentQuestionIndex: 0,
        currentQuestion: quiz.questions[0],
        score: 0
    };

    addBotMessage(`Let's start the ${quiz.title}!`);
    addBotMessage(`Question 1: ${quiz.questions[0].question}\n\nOptions:\n${
        quiz.questions[0].options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')
    }`);
}

function startScenario(scenarioId) {
    const scenario = scenarios[scenarioId];
    if (!scenario) return;

    window.currentScenario = scenario;
    addBotMessage(scenario.description);
    addBotMessage("Please choose an option:\n" + 
        scenario.options.map((opt, i) => `${i + 1}. ${opt.choice}`).join('\n'));
}

function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches
    for (const [key, value] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    
    // If no exact match, return a generic response with available features
    return "I understand you're asking about climate change. I can help you with:\n\n" +
           "1. Basic climate change information\n" +
           "2. How to reduce your carbon footprint\n" +
           "3. Renewable energy sources\n" +
           "4. The greenhouse effect\n" +
           "5. Climate change impacts\n" +
           "6. What you can do to help\n\n" +
           "You can also:\n" +
           "- Take a quiz (type 'quiz')\n" +
           "- Explore scenarios (type 'scenario')\n" +
           "- Ask specific questions about climate change\n\n" +
           "What would you like to learn about?";
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

async function getAIResponse() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: chatHistory,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.code === 'insufficient_quota') {
                throw new Error('API quota exceeded');
            }
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        if (error.message.includes('quota')) {
            throw new Error('API quota exceeded');
        } else if (error.message.includes('API key')) {
            throw new Error('Invalid API key');
        } else if (error.message.includes('rate limit')) {
            throw new Error('Rate limit exceeded');
        } else if (!navigator.onLine) {
            throw new Error('Network error');
        }
        throw error;
    }
}

function handleError(error) {
    let errorMessage = 'Sorry, I encountered an error. ';
    
    if (error.message.includes('quota')) {
        errorMessage = 'The API quota has been exceeded. Using local responses instead.';
    } else if (error.message.includes('API key')) {
        errorMessage += 'Invalid API key. Using local responses instead.';
    } else if (error.message.includes('rate limit')) {
        errorMessage += 'API rate limit exceeded. Using local responses instead.';
    } else if (error.message.includes('network')) {
        errorMessage += 'Network error. Using local responses instead.';
    } else {
        errorMessage += error.message;
    }
    
    addMessage(errorMessage, 'bot');
    console.error('Error:', error);
}

// Initialize chat
clearChat();