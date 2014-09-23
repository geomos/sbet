/*
*/
$(document).on('ready', init);

/*
*/
function init() {
	/*
	*/

    $("#chart2").kendoTreeMap({
    dataSource: {
            data: [{
                name: "foo",
                value: 1,
                items: [{
                    name: "bar",
                    value: 1
                },{
                    name: "baz",
                    value: 1
                }]
            }],
            schema: {
                model: {
                    children: "items"
                }
            }
        },
        valueField: "value",
            textField: "name",
            colorField: "color"
    });


$("#chart").kendoChart({
		legend: {
			visible: false
		},
		seriesDefaults: {
			type: "line",
			stack: true
		},
		series: [{
			name: "Test",
			data: [40, 32, 34, 37, 35, 36],
			color: "#510c76"
		}],
		valueAxis: {
			max: 50,
			line: {
				visible: false
			},
			visible: false
		},
		categoryAxis: {
			categories: ['JAN/2014', 'MAR/2014', 'JUL/2014', 'AGO/2014', 'SEP/2014', 'OCT/2014'],
			majorGridLines: {
				visible: false
			},
			labels: {
				color: "#6f6f6f",
				font: "12px Oswald,sans-serif"
			}
		}
	});

	/*
	*/
	$("#graph-collapse").kendoChart({
		chartArea: {
			background: "#f8f8f8"
		},
		legend: {
			visible: false
		},
		seriesDefaults: {
			type: "line",
			stack: true
		},
		series: [{
			name: "Gold Medals",
			data: [15, 10, 18, 12, 10, 3],
			color: "#540e81"
		}, {
			name: "Silver Medals",
			data: [15, 5, 20, 3, 12, 10],
			color: "#f47119"
		}, {
			name: "Bronze Medals",
			data: [30, 15, 2, 10, 20, 19],
			color: "#e53e30"
		}, {
			name: "Bronze Medals",
			data: [20, 20, 30, 10, 15, 20],
			color: "#009bdf"
		}],
		valueAxis: {
			max: 100,
			visible: true,
			labels: {
				format: "{0}%",
				font: "12px Oswald,sans-serif"
			},
			line: {
				visible: false
			},
			axisCrossingValue: -10
		},
		categoryAxis: {
			categories: ['JAN/2014', 'MAR/2014', 'JUL/2014', 'AGO/2014', 'SEP/2014', 'OCT/2014'],
			majorGridLines: {
				visible: false
			},
			labels: {
				color: "#6f6f6f",
				font: "12px Oswald,sans-serif"
			}
		}
	});

	/*
	*/

    var freqs = [
        { text: "Annually", value: "1" },
        { text: "Quarterly", value: "2" },
        { text: "Monthly", value: "3" }
    ];

    var fyears = [
        { text: "2014", value: "2014" },
        { text: "2013", value: "2013" },
        { text: "2012", value: "2012" }
    ];

    var fquarters = [
        { text: "Q1", value: "Q1" },
        { text: "Q2", value: "Q2" },
        { text: "Q3", value: "Q3" },
        { text: "Q4", value: "Q4" }
    ];

    var fmonths = [
        { text: "January", value: "1" },
        { text: "February", value: "2" },
        { text: "March", value: "3" },
        { text: "April", value: "4" },
        { text: "May", value: "5" },
        { text: "June", value: "6" },
        { text: "July", value: "7" },
        { text: "August", value: "8" },
        { text: "September", value: "9" },
        { text: "October", value: "10" },
        { text: "November", value: "11" },
        { text: "December", value: "12" }

    ]

    //control frequency selection
    function onFreqChange() {
        //Clear selections
        filterYear.value("");
        filterQuarter.value("");
        filterMonth.value("");

        //Depending on the frequency disable dropdowns
        var value = $("#filterFrequency").val();
        switch (value) {
            case "1":
                filterYear.enable();
                filterQuarter.enable(false);
                filterMonth.enable(false);
                break;
            case "2":
                filterYear.enable();
                filterQuarter.enable();
                filterMonth.enable(false);
                break;
            default:
                filterYear.enable();
                filterQuarter.enable(false);
                filterMonth.enable();
        }
    };

	var filterFrequency = $("#filterFrequency").kendoDropDownList({
		optionLabel: "Select frequency...",
		dataTextField: "text",
		dataValueField: "value",
		dataSource: freqs,
        change: onFreqChange
	}).data("kendoDropDownList");

	var filterYear = $("#filterYear").kendoDropDownList({
		optionLabel: "Select a year...",
		dataTextField: "text",
		dataValueField: "value",
		dataSource: fyears
	}).data("kendoDropDownList");

	var filterQuarter = $("#filterQuarter").kendoDropDownList({
		optionLabel: "Select a quarter...",
		dataTextField: "text",
		dataValueField: "value",
        dataSource: fquarters
	}).data("kendoDropDownList");

    var filterMonth = $("#filterMonth").kendoDropDownList({
        optionLabel: "Select a month...",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: fmonths
    }).data("kendoDropDownList");

	/*
	*/
	//var required = $(".multiple-select-required").kendoMultiSelect().data("kendoMultiSelect");
    var industrySelection = $("#selectIndustry").kendoMultiSelect().data("kendoMultiSelect");
    var sizeSelection = $("#selectSize").kendoMultiSelect().data("kendoMultiSelect");
    var regionSelection = $("#selectRegion").kendoMultiSelect().data("kendoMultiSelect");
}


//varible elements collapse change icon
    var change_icon, change_icon_collapse = {
	    settings: {
		class: null,
		class_icon_up: 'icon-arrow-up',
		class_icon_down: 'icon-arrow-down',
		height: 0
	},
	/*
	*/
	init: function(class_name) {
		change_icon = this;

		this.settings.class = '.' + class_name;
		var elements = $('body').find(this.settings.class);

		this.add_event_listener(elements);
	},
	/*
	*/
	add_event_listener: function(elements) {
		if(elements != null && elements.length > 0) {
			$.each(elements, function(key, value) {
				var element = $(value);
				var height_open = 0;
				var close = $(value).parent().find(' > div.panel-collapse.in');

				element.off('click').on('click', function() {
					var parent = element.parent().find('.panel-collapse');
					height_open = parent.parent().parent();

					if(element.find('h4 > span:last-child').attr('class') == change_icon.settings.class_icon_up) {
						element.find('h4 > span:last-child').removeClass(change_icon.settings.class_icon_up);
						element.find('h4 > span:last-child').addClass(change_icon.settings.class_icon_down);
					} else {
						element.find('h4 > span:last-child').removeClass(change_icon.settings.class_icon_down);
						element.find('h4 > span:last-child').addClass(change_icon.settings.class_icon_up);
					}
				});
			});
		} else {
			console.log('Error: no elements!');
		}
	}
};

//change icon results graph
var change_icon_results, change_icon_collapse_results = {
	settings: {
		class: null,
		class_icon_up: 'icon-minimus',
		class_icon_down: 'icon-plus',
		height: 0
	},
	/*
	*/
	init: function(class_name) {
		change_icon_results = this;

		this.settings.class = '.' + class_name;
		var elements = $('body').find(this.settings.class);

		this.add_event_listener(elements);
	},
	/*
	*/
	add_event_listener: function(elements) {
		if(elements != null && elements.length > 0) {
			$.each(elements, function(key, value) {
				var element = $(value);
				var height_open = 0;
				var close = $(value).parent().find(' > div.panel-collapse.in');

				element.off('click').on('click', function() {
					var parent = element.parent().find('.panel-collapse');
					height_open = parent.parent().parent();

					element.parent().parent().parent().find('h4 > span').removeClass(change_icon_results.settings.class_icon_up);
					element.parent().parent().parent().find('h4 > span').removeClass(change_icon_results.settings.class_icon_down);

					element.parent().parent().parent().find('h4 > span').addClass(change_icon_results.settings.class_icon_down);

					if(element.parent().find('.panel-collapse').hasClass('in')) {
						element.find('h4 > span').addClass(change_icon_results.settings.class_icon_up);
					} else {
						element.find('h4 > span').removeClass(change_icon_results.settings.class_icon_down);
						element.find('h4 > span').addClass(change_icon_results.settings.class_icon_up);
					}
				});
			});
		} else {
			console.log('Error: no elements!');
		}
	}
};

/*
*/
$(function(){
	change_icon_collapse.init('panel-heading');
	change_icon_collapse_results.init('content-window .panel-heading');
});