var app = new Vue({
    el: '#app',
    data: {
        objProps: [{ key: 'id', type: 'guid'}],
        amount: 1,
    },
    methods: {
        addProp() {
            this.objProps.push({ key:'', type: '' });
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
                    .filter(prop => prop.key && chance[prop.type])
                    .forEach(prop => obj[prop.key] = chance[prop.type]());
                json.push(obj);
            }
            return json;
        }
    }
});