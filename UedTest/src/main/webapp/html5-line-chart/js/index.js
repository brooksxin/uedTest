var myData = {
  labels : ["Mo","Di","Mi","Do","Fr","Sa","So","Di","Mi","Do","Fr","Sa","So"],
  datasets : [
    {
      fillColor : "rgba(220,220,220,.5)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      data : [65,59,90,81,56,55,40,59,90,81,56,55,40]
    },
    {
      fillColor : "rgba(90,190,90,.5)",
      strokeColor : "rgba(90,190,90,1)",
      pointColor : "rgba(90,190,90,1)",
      pointStrokeColor : "#fff",
      data : [40,48,40,40,90,27,90,36,56,71,90,43,21]
    },
    {
      fillColor : "rgba(45,1,92,.5)",
      strokeColor : "rgba(45,1,92,1)",
      pointColor : "rgba(45,1,92,1)",
      pointStrokeColor : "#fff",
      data : [75,36,56,71,100,43,19,48,40,40,90,27,90]
    }
  ]
}

new Chart(document.getElementById("canvas").getContext("2d")).Line(myData)