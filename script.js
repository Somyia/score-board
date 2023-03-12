

//targeting DOM
const matchContainer = document.getElementById('match-container');
const singleMatch = document.getElementById('single-match');
const addAnothermatch = document.getElementById('add-match');
const matchName = document.getElementById('match-name');
const decrementEl = document.getElementById('decrement');
const results = document.querySelectorAll('.lws-singleResult');
const resetEl = document.getElementById('reset');


//initial state
const initialState = [
    {
        id: 1,
        score: 0
    },

];




const ADDMATCH = 'add-match';
const INCREMENT = "increment";
const DECREMENT = 'decrement';
const RESET = 'reset';

//action creators
const addMatch = () => {
    return {
        type: ADDMATCH,
    }
}

const increment = (value, id) => {
    return {
        type: INCREMENT,
        payload: {
            id: id,
            value: value,
        }
    }
}

const decrement = (value, id) => {
    return {
        type: DECREMENT,
        payload: {
            id: id,
            value: value,
        }
    }
}

const reset = () => {
    return {
        type: RESET
    }
}

const matchId = (matches) => {
    const maxValue = matches.reduce((maxValue, match) => Math.max(match.id, maxValue), -1);
    return maxValue + 1;
}

//reducer function
const matchReducer = (state = initialState, action) => {

    if (action.type === ADDMATCH) {
        const id = matchId(state);
        return [...state, { id, score: 0 }]

    }

    else if (action.type === INCREMENT) {
        const matches = state.map((match) => {
            if (match.id === action.payload.id) {
                return {
                    ...match,
                    score: match.score + action.payload.value

                }
            }
            else {
                return match;
            }
        })
        return matches;
    }
    else if (action.type === DECREMENT) {
        const matches = state.map((match) => {
            if (match.id === action.payload.id) {
                console.log(match.score - action.payload.value)
                return {
                    ...match,
                    score: match.score - action.payload.value


                }
            }
            else {
                return match;
            }
        })
        return matches;
    }
    else if (action.type === RESET) {
        const resetMatches = state.map((match) => ({
            ...match,
            score: 0,
        })
        )
        return resetMatches;
    }
    else {
        return state;
    }

}



//store create
const store = Redux.createStore(matchReducer);

const render = () => {
    const state = store.getState();
    const newMatch = state?.map((match) => {
        if (match.score < 0) {
            match.score = 0;
        }
        return ` <div id="single-match" class="match">
                    <div class="wrapper">
                        <button class="lws-delete">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 id="match-name" class="lws-matchName">Match ${match.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm" onsubmit="event.preventDefault(); incrementHandaler(${match.id},this)" id="increment-form">
                            <h4>Increment</h4>
                            <input type="number" name="increment" class="lws-increment" id="increment-input" />
                        </form>
                        <form class="decrementForm" onsubmit="event.preventDefault(); decrementHandaler(${match.id},this)" id="decrement-form">
                            <h4>Decrement</h4>
                            <input type="number" name="decrement" class="lws-decrement" id="decrement-input" />
                        </form>
                    </div>
                    <div class="numbers">
                        <h2 class="lws-singleResult" id="result">${match.score}</h2>
                    </div>
                </div> `;
    }).join("");

    matchContainer.innerHTML = newMatch;


}

render();

store.subscribe(render);


//add new match

addAnothermatch.addEventListener('click', () => {
    store.dispatch(addMatch());

})

//increment operation
const incrementHandaler = (id, formEl) => {
    const incrementEl = formEl.querySelector('#increment-input');
    const incrementValue = Number(incrementEl.value);
    store.dispatch(increment(incrementValue, id));

}


//decrement operation
const decrementHandaler = (id, formEl) => {
    const decrementEl = formEl.querySelector('#decrement-input');
    const decrementValue = Number(decrementEl.value);
    store.dispatch(decrement(decrementValue, id));

}


//reset operation
resetEl.addEventListener('click', () => {
    store.dispatch(reset());
})
