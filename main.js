/* sorry lol */

var sheet = "https://spreadsheets.google.com/feeds/list/1d7PhqlpzMrUrmxXO_6MEkL1eL61Q898rIsPAptrpaA4/1/public/basic?alt=json";

var main = new Vue({
    el: '#internships',
    data: {
        search: "",
        sortByCompany: 0,
        sortByPay: 0,
        pageSize: 50,
        currentPage: 1,
        entries: []
    },

    mounted() {
        this.fetchData();

    },

    methods: {

        nextPage: function () {

            $(".btn-prev").attr("disabled", false);

            if (this.currentPage * this.pageSize < this.entries.length) this.currentPage++;

            if (this.currentPage * this.pageSize > this.entries.length) {
                $(".btn-next").attr("disabled", true);
            }

        },

        prevPage: function () {

            $(".btn-next").attr("disabled", false);

            if (this.currentPage > 1) this.currentPage--;

            if (this.currentPage == 1) {
                $(".btn-prev").attr("disabled", true);
            }


        },

        fetchData: function () {

            var self = this;

            var url = "https://spreadsheets.google.com/feeds/list/1d7PhqlpzMrUrmxXO_6MEkL1eL61Q898rIsPAptrpaA4/1/public/basic?alt=json";



            function parse(data) {
            

                let temp = {
                    institution: data.title.$t,
                    how: null,
                    details: null,
                    contact: null,
                    link: null,
                    tags: []
                };
                    
                
               console.log(data.content.$t.split(','));
                
                temp.how = data.content.$t.split(',')[0].substr(11).trim().toLowerCase();
                
                temp.details = (data.content.$t.split(',')[1].substr(9));
                
                temp.contact = data.content.$t.split(',')[2].substr(14);
                
                temp.link = data.content.$t.split(',')[3].substr(7);
                
                for(let i = 4; i < data.content.$t.split(',').length; i++){
                   
                   if(i == 4){
                       temp.tags.push(data.content.$t.split(',')[i].substr(7));
                   } else{
                       temp.tags.push(data.content.$t.split(',')[i].substr(1));
                   }
                       
                }
                
               // temp.tags = data.content.$t.split(',')[3].substr(14);
                
                
                console.log(temp);

                return temp;

            }

            $.getJSON(url, function (res) {


                })
                .done(function (res) {

                    let test = [];


                    for (let i of res.feed.entry) {
                        test.push(parse(i));
                    }
                
                    self.entries = test;
                    // console.log(test);

                });
        },

        sort: function (key) {

            if (key == "company") {

                if (this.sortByCompany == 0) {
                    this.sortByCompany = 1;

                    this.entries.sort((a, b) => {
                        if (a.company.toLowerCase() < b.company.toLowerCase()) {
                            return 1
                        }

                        if (a.company.toLowerCase() > b.company.toLowerCase()) {
                            return -1
                        }

                        return 0
                    })

                } else {
                    this.sortByCompany = 0

                    this.entries.sort((a, b) => {
                        if (a.company.toLowerCase() > b.company.toLowerCase()) {
                            return 1
                        }

                        if (a.company.toLowerCase() < b.company.toLowerCase()) {
                            return -1
                        }

                        return 0
                    })

                }

            } else {

                if (this.sortByPay == 0) {
                    this.sortByPay = 1;

                    this.entries.sort((a, b) => {
                        if (a.pay < b.pay) {
                            return 1
                        }

                        if (a.pay > b.pay) {
                            return -1
                        }

                        return 0
                    })

                } else {
                    this.sortByPay = 0;


                    this.entries.sort((a, b) => {
                        if (a.pay > b.pay) {
                            return 1
                        }

                        if (a.pay < b.pay) {
                            return -1
                        }

                        return 0
                    })

                }



            }



        }

    },

    computed: {

        query() {

            return this.entries.filter(entry => {
                return entry.institution.toLowerCase().includes(this.search.toLowerCase())
            }).filter((row, index) => {

                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;


            })

            /*   return this.entries.filter(entry => {
                  return entry.company.toLowerCase().includes(this.search.toLowerCase())
              }) */


        }

    }

});
