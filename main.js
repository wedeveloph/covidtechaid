/* iM SORRY */


document.getElementById("last").innerHTML = document.lastModified;


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
                    company: data.title.$t,
                    role: null,
                    pay: null,
                    notes: null
                };


                temp.pay = data.content.$t.split(',')[0].substr(4).trim().toLowerCase();
                temp.notes = (data.content.$t.split(',').slice(1).join(',')).substr(8);


                return temp;

            }

            $.getJSON(url, function (res) {


                })
                .done(function (res) {

                    let test = [];


                    for (let i of res.feed.entry) {
                        test.push(parse(i));
                    }

                    document.getElementById("count").innerHTML = test.length;

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
                return entry.company.toLowerCase().includes(this.search.toLowerCase())
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
