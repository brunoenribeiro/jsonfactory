var app = new Vue({
    el: '#app',
    data: {
        objProps: initObjPropsFromURL(window.location.href),
        amount: 1
    },
    methods: {
        addProp() {
            this.objProps.push({ key:'', type: '' });
        },
        removeProp(index) {
            this.objProps = this.objProps.filter((el, i) => i !== index);
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
                this.objProps
                    .filter(prop => prop.key && chance[prop.type])
                    .forEach(prop => obj[prop.key] = chance[prop.type]());
                json.push(obj);
            }
            return JSON.stringify(json);
        },
        configURL() {
            return window.location.href.replace(/(\?.*)/, '')
                + '?'
                + this.objProps
                    .map((prop, i) => `${i}=${prop.key},${prop.type}`)
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
            type: p.match(/\,(.*)/)[1]
        }));
}