var createDataType = (name = '', label = '', opts = {}, chanceMethodName = '') => {
    if (!chanceMethodName) chanceMethodName = name;
    return {
        name,
        label,
        opts,
        chanceMethodName
    }
};

var DATA_TYPES = [
    createDataType('name', 'full name'),
    createDataType('first', 'first name'),
    createDataType('last', 'last name'),
    createDataType('age', 'age'),
    createDataType('birthday', 'birthday'),
    createDataType('cpf', 'cpf'),
    createDataType('email', 'email'),
    createDataType('address', 'address'),
    createDataType('city', 'city'),
    createDataType('guid', 'guid'),
    createDataType('string', 'string', { length: 15 })
];

var app = new Vue({
    el: '#app',
    data: {
        DATA_TYPES,
        objKeys: initObjPropsFromURL(window.location.href),
        amount: 1
    },
    methods: {
        addProp() {
            this.objKeys.push({ key:'', type: createDataType() });
        },
        removeProp(index) {
            this.objKeys = this.objKeys.filter((el, i) => i !== index);
        },
        copyToClipboard() {
            let code = document.querySelector('#json');
            code.setAttribute('type', 'text');
            code.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
            } catch (err) {}

            /* unselect the range */
            code.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        }
    },
    computed: {
        json() {
            var json = [];
            for (i = 0; i < this.amount; i++) {
                var obj = {};
                this.objKeys
                    .filter(prop => prop.key && chance[prop.type.chanceMethodName])
                    .forEach(prop => obj[prop.key] = chance[prop.type.chanceMethodName](prop.type.opts));
                json.push(obj);
            }
            return JSON.stringify(json);
        },
        configURL() {
            return window.location.href.replace(/(\?.*)/, '')
                + '?'
                + this.objKeys
                    .map((prop, i) => `${i}=${prop.key},${prop.type.name}`)
                    .join('&');
        }
    }
});

// Helper functions
function initObjPropsFromURL(href) {
    if (!href.match(/\?(.*)/)) return [{ key: 'id', type: 'guid'}];
    var queryParams = href.match(/\?(.*)/)[1];
    return queryParams
        .split('&')
        .map(p => ({
            key: p.match(/\=(.*)\,/)[1],
            type: DATA_TYPES.find(type => type.name === p.match(/\,(.*)/)[1])
        }));
}