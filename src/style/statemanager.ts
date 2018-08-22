namespace LayoutLzg {

    export class State {
        name:string;
        style:Style;
    }

    export class StateGroup {
        groupName:string;
        states:List<State>;
        rootWidget:Widget;

        constructor() {
            this.states = new List<State>();
        }

        stateNames() {
            return this.states.map(t=>t.name);
        }

        addState(state:State) {
            this.states.add(state);
        }

        removeStateByName(stateName:string) {
            let statescandidate = this.states.filter(t=>t.name==stateName);
            for (let state of statescandidate) {
                this.states.remove(state);
            }
        }

        removeState(state:State) {
            this.states.remove(state);
        }

        removeAllStates() {
            this.states.clear();
        }

        findStateByName(stateName:string):State {
            let states = this.states.filter(t=>t.name==stateName);
            if(states.length>0) return states[0];
            return null;
        }

        applyState(stateName:string) {
            let state = this.findStateByName(stateName);
            if(state==null) return;
            if(state.style==null) return;
            if(this.rootWidget==null) return;
            state.style.apply(this.rootWidget);
        }

    }

}