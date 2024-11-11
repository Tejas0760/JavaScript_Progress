const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

const event = [...new Set(gameEvents.values())];
console.log(event);

gameEvents.delete(64);
console.log(gameEvents.values());

console.log(
    `An event happened on an average of every ${90 / gameEvents.size}mins`
)

for(const [time, event] of gameEvents){
    const half = time <= 45 ? "First Half" : "Second Half";
    console.log(`[${half}] ${time}: ${event}`);
}

