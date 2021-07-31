const data_container = document.querySelector('.container');
const generate = document.querySelector('#generate_bar');


// to create bar graph.
function BarGraph(num = 40) {
	for (let i = 0; i < num; i += 1) {
	    const value = Math.floor(Math.random() * 200);

	    const block = document.createElement("div");
	    block.classList.add("block");
	    block.style.height = `${value * 3}px`;
	    block.style.transform = `translateX(${i * 30}px)`;

	    const blockLabel = document.createElement("label");
	    blockLabel.classList.add("block__id");
	    blockLabel.innerHTML = value; 

	    block.appendChild(blockLabel);
	    data_container.appendChild(block);
  }
}



// to make sure old bars get erased completely.
function regen() {
	window.location.reload();
}


// to swap two selected bars.
function swap(el1, el2) {
	return new Promise(resolve => {
		const style1 = window.getComputedStyle(el1);
		const style2 = window.getComputedStyle(el2);

		const transform1 = style1.getPropertyValue("transform");
		const transform2 = style2.getPropertyValue("transform");

		el1.style.transform = transform2;
		el2.style.transform = transform1;

		el1.style.backgroundColor = "#FF4949";
		el2.style.backgroundColor = "#FF4949";

		window.requestAnimationFrame(function() {
			setTimeout( () => {
				data_container.insertBefore(el2, el1);
				resolve();
			}, 300);
		});
	});
};

BarGraph();


//insertion sort.
async function InsertionSort(delay=200){
	let blocks = document.querySelectorAll(".block");

	for (let i = 1; i < blocks.length; i++ ) {
		var j = i - 1;

		var val = Number(blocks[i].childNodes[0].innerHTML);

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, delay)
		);
		
		while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > val) {
			blocks[i].style.backgroundColor = "#0000ff";

			await swap(blocks[j], blocks[j+1]);
			blocks = document.querySelectorAll(".block");

			j--;

		}
	}
}
