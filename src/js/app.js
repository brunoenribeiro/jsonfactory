var app = new Vue({
    el: '#app',
    data: {
        objProps: ['id'],
        amount: 1,
    },
    methods: {
        addProp() {
            this.objProps.push('');
        },
        removeProp(index) {
            this.objProps = this.objProps.filter((el, i) => i !== index);
        }
    },
    computed: {
        json: function json() {
            var json = [];
            for (i = 0; i < this.amount; i++) {
                var obj = {};
                this.objProps
                    .filter(prop => prop)
                    .forEach(prop => obj[prop] = chance.name());
                json.push(obj);
            }
            return json;
        }
    }
});