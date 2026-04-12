---
layout: post
title: "Mahjong AI"
date: 2024-01-01
toc: false
---


<center>
<figure style="text-align: center;">
    <video controls muted style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/Game.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Hard x4 agents playing each other</em></figcaption>
</figure>
</center>


## About the Project

Mahjong is an imperfect information game, which makes it a genuinely interesting AI problem. You can only see your own tiles and what opponents have discarded, so any decision has to reason about what might be hidden. This project covers two systems built over 8 weeks: a shanten calculator that measures how far a hand is from winning, and a Monte Carlo AI that uses it to make discard decisions under uncertainty. Three difficulty levels let the approaches be compared directly in gameplay.

**Team:** Solo    
**Duration:** 8 weeks   
**Engine:** Unreal Engine   
**Source code:** [GitHub](https://github.com/ChadJoey/Mahjong)    

---

## Background

In Mahjong, a hand of 13 tiles wins when it forms one of three recognised patterns. The most common is four groups of three tiles plus one pair. The two alternatives are seven pairs, and thirteen orphans, a rare pattern requiring one of each terminal and honour tile.

The shanten number measures how far a hand is from winning. A shanten of 1 means one more useful tile reaches tenpai, where a single tile completes the hand. A shanten of 0 means the hand is already in tenpai. A shanten of -1 means the hand is complete and winning. Getting this calculation right and fast is the foundation everything else builds on.

---
## Shanten Calculator

A full write-up of the algorithm is available in my **[blog post](https://medium.com/@joeyvharen55/building-a-mahjong-shanten-calculator-in-c-c11e6bfb0a73)**. The short version is below.

The core approach uses lookup tables, derived from the method described by Yang (2014). During startup the calculator pre-computes a table for every possible arrangement of tiles within a single suit, storing how many tiles away that arrangement is from forming complete groups. When evaluating a hand it splits the tiles by suit and looks each portion up instantly rather than recalculating on the fly, making real-time decision-making feasible even when the AI runs many simulations per turn.

All three winning hand types are handled: standard hands, seven pairs, and thirteen orphans. The final shanten is the minimum across all three.

### Accuracy Testing

Accuracy was validated by testing approximately 50 hands against an established online shanten calculator, covering nearly-complete hands, hands far from winning, and edge cases including honour-only hands and hands valid under multiple winning patterns simultaneously.

The screenshots below show the in-engine testing tool. Each test displays the hand, the calculated shanten number, and a ranked list of every possible discard with its resulting shanten.

19 out of 19 structured test cases pass. An earlier version failed on W5, a specific four-of-a-kind edge case where the table-based approach did not consider that one tile from a quad could contribute to an adjacent sequence. This has since been fixed.

<details markdown="1">
<summary><span class="icon"></span> Winning hands — Expected: -1</summary>

**W1 — Standard complete hand**<br>
1m 2m 3m | 4m 5m 6m | 7m 8m 9m | 1p 2p 3p | 4p 4p<br>
Four sequences plus a pair. The simplest sanity check.<br>
<img src="/assets/img/Mahjong/ShantenWinningTest.png" alt="W1 standard complete hand shanten test" style="display: block;"/>

**W2 — Seven pairs complete**<br>
1m 1m | 2p 2p | 3s 3s | 4m 4m | 5p 5p | 6s 6s | 1z 1z<br>
Seven pairs, all different tile types.<br>
<img src="/assets/img/Mahjong/ShantenWinningTest2.png" alt="W2 seven pairs complete shanten test" style="display: block;"/>

**W3 — Thirteen orphans complete**<br>
1m 1m | 9m | 1p | 9p | 1s | 9s | 1z | 2z | 3z | 4z | 5z | 6z | 7z<br>
All 13 terminals and honours plus a duplicate 1m. Tests the pair bonus in the kokushi formula.<br>
<img src="/assets/img/Mahjong/ShantenWinningTest3.png" alt="W3 thirteen orphans complete shanten test" style="display: block;"/>

**W4 — All-honour winning hand**<br>
1z 1z 1z | 2z 2z 2z | 3z 3z 3z | 4z 4z 4z | 5z 5z<br>
Four honour triplets plus a pair. No sequences possible. Forces the honour-only table path.<br>
<img src="/assets/img/Mahjong/ShantenWinningTest4.png" alt="W4 all-honour winning hand shanten test" style="display: block;"/>

**W5 — Quad tiles folded into a winning hand**<br>
1m 1m 1m 1m | 2m 3m | 2p 3p 4p | 5p 6p 7p | 9s 9s<br>
The four 1m tiles split across a triplet and a sequence. An earlier version of the calculator treated the quad as a single block and returned 0 instead of -1. This case now passes after the fix.<br>
<img src="/assets/img/Mahjong/ShantenWinningTest5.png" alt="W5 quad tiles folded into winning hand shanten test" style="display: block;"/>

</details>

<details markdown="1">
<summary><span class="icon"></span> Tenpai — Expected: 0</summary>

**T1 — Pair wait (tanki)**<br>
1m 2m 3m | 4m 5m 6m | 7m 8m 9m | 1p 2p 3p | 4p<br>
Four complete melds, isolated 4p waiting for its pair.<br>
<img src="/assets/img/Mahjong/TenpaiTest.png" alt="T1 pair wait tenpai test" style="display: block;"/>

**T2 — Two-sided sequence wait (ryanmen)**<br>
1m 2m 3m | 4m 5m 6m | 7m 8m 9m | 1p 1p | 2p 3p<br>
Three melds plus pair plus partial sequence, waiting for 1p or 4p.<br>
<img src="/assets/img/Mahjong/TenpaiTest2.png" alt="T2 two-sided sequence wait tenpai test" style="display: block;"/>

**T3 — Middle tile wait (kanchan)**<br>
1m 2m 3m | 4m 5m 6m | 7m 8m 9m | 1p 3p | 2p 2p<br>
Partial kanchan needing 2p alongside a pair of 2p. Tests that a tile appearing in both does not confuse the calculator.<br>
<img src="/assets/img/Mahjong/TenpaiTest3.png" alt="T3 middle tile wait tenpai test" style="display: block;"/>

**T4 — Double pair wait (shanpon)**<br>
1m 2m 3m | 4m 5m 6m | 7m 8m 9m | 2p 2p | 3p 3p<br>
Three melds plus two pairs, waiting for either to complete as a meld while the other stays as the pair.<br>
<img src="/assets/img/Mahjong/TenpaiTest4.png" alt="T4 double pair wait tenpai test" style="display: block;"/>

**T5 — Honour-only tenpai**<br>
1z 1z 1z | 2z 2z 2z | 3z 3z 3z | 4z 4z 4z | 5z<br>
Four honour triplets, isolated 5z waiting for its pair. Forces the honour table exclusively.<br>
<img src="/assets/img/Mahjong/TenpaiTest5.png" alt="T5 honour-only tenpai test" style="display: block;"/>

**T6 — Thirteen orphans tenpai**<br>
1m | 9m | 1p | 9p | 1s | 9s | 1z | 2z | 3z | 4z | 5z | 6z | 7z<br>
All 13 terminals and honours with no duplicate, waiting for any one of them.<br>
<img src="/assets/img/Mahjong/TenpaiTest6.png" alt="T6 thirteen orphans tenpai test" style="display: block;"/>

**T7 — Seven pairs tenpai with a triplet**<br>
1m 1m 1m | 2p 2p | 3s 3s | 4m 4m | 5p 5p | 6s 6s | 7z<br>
Six pairs where one is a triplet. The triplet should count as only one pair. Waiting for 7z.<br>
<img src="/assets/img/Mahjong/TenpaiTest7.png" alt="T7 seven pairs tenpai with triplet test" style="display: block;"/>

**T8 — Both seven pairs and standard tenpai simultaneously**<br>
1m 1m | 2m 2m | 3m 3m | 4m 4m | 5m 5m | 6m 6m | 7m<br>
Valid as both a six-pair wait and a standard four-meld wait on 7m. Tests that the minimum is taken correctly.<br>
<img src="/assets/img/Mahjong/TenpaiTest8.png" alt="T8 dual pattern tenpai test" style="display: block;"/>

</details>

<details markdown="1">
<summary><span class="icon"></span> Shanten = 1</summary>

**S1 — Three melds plus pair plus isolated honour**<br>
1m 2m 3m | 4p 5p 6p | 7s 8s 9s | 1z 1z | 2z<br>
Three complete melds plus a pair plus an isolated honour tile that contributes nothing. Needs one more useful tile.<br>
<img src="/assets/img/Mahjong/ShantenTest.png" alt="S1 three melds plus isolated honour shanten test" style="display: block;"/>

**S2 — Thirteen orphans one away, no pair**<br>
1m | 9m | 1p | 9p | 1s | 9s | 1z | 2z | 3z | 4z | 5z | 6z | 5m<br>
Twelve of the thirteen required terminals and honours, missing 7z, plus a useless 5m. No pair among the terminals.<br>
<img src="/assets/img/Mahjong/ShantenTest2.png" alt="S2 thirteen orphans one away shanten test" style="display: block;"/>

</details>

---


## Monte Carlo AI

Mahjong is an imperfect information game. Each player can only see their own tiles and what others have discarded, which makes pure greedy strategies unreliable since they cannot account for what opponents are holding or building toward.

The AI uses Monte Carlo with determinization to handle this. Before each simulation the unknown tiles are randomly distributed across opponents' hands and the draw pile in a plausible way. The game then plays out as if all information were visible. Repeating this many times and averaging the results approximates the true expected outcome without needing to see hidden information directly.

What is implemented is flat Monte Carlo with determinization rather than full Monte Carlo Tree Search. Full MCTS builds and reuses a decision tree across simulations. Cowling et al. note that for games where hidden information changes rapidly every turn, flat Monte Carlo with determinization can perform comparably to full MCTS while being simpler to implement correctly. Every draw and discard in Mahjong changes what opponents might be holding, which makes the per-turn information shift high enough that the simpler approach holds up well.

### Difficulty Levels

Three difficulty levels let the approaches be compared directly in gameplay:

- **Easy** discards a random tile each turn
- **Medium** always discards whichever tile minimises the shanten number, using the calculator directly
- **Hard** uses the Monte Carlo simulation described below

### How EvaluateDiscards Works

When the Hard AI needs to discard, `EvaluateDiscards` runs the full decision process. It takes the current hand, the tiles known to be visible (discards and revealed melds across all players), opponent meld counts, and the number of tiles remaining in the wall.

**Step 1: Find the minimum achievable shanten.** Before running any simulations the function scans all possible discards and finds the best shanten achievable. This is used to prune the candidate list in the next step.

```cpp
int32 MinShanten = INT32_MAX;
for (int32 i = 0; i < 34; ++i)
{
    if (Input.MyHand34[i] == 0) continue;
    TArray Test = Input.MyHand34;
    Test[i]--;
    MinShanten = FMath::Min(MinShanten, FShantenCalculator::Calculate(Test));
}
```

**Step 2: Build candidates.** Only discards that achieve the minimum shanten are worth simulating. For each candidate, the pool of unknown tiles is pre-built on the game thread. This is important because `FMath::Rand` is not thread-safe, so random seeds are also generated here before any parallel work begins:

```cpp
for (int32 TileIdx = 0; TileIdx < 34; ++TileIdx)
{
    if (Input.MyHand34[TileIdx] == 0) continue;

    TArray Hand13 = Input.MyHand34;
    Hand13[TileIdx]--;

    const int32 Shanten = FShantenCalculator::Calculate(Hand13);
    if (Shanten > MinShanten) continue; // prune candidates worse than best

    TArray Pool34 = BuildUnknownPool34(Input, Hand13);
    // flatten pool into a list for easy shuffling
    TArray UnknownList;
    for (int32 i = 0; i < 34; ++i)
        for (int32 c = 0; c < Pool34[i]; ++c)
            UnknownList.Add(i);

    FCandidate& C = Candidates.AddDefaulted_GetRef();
    C.TileIdx     = TileIdx;
    C.Hand13      = MoveTemp(Hand13);
    C.UnknownList = MoveTemp(UnknownList);
    C.BaseShanten = Shanten;
    C.Seed        = FMath::RandRange(0, INT32_MAX); // game thread only
}
```

The unknown pool is built by starting with four copies of every tile and subtracting the known hand and all visible tiles:

```cpp
TArray FMahjongMonteCarloSimulator::BuildUnknownPool34(
    const FMonteCarloInput Input, const TArray& MyHand13)
{
    TArray Pool;
    Pool.Init(4, 34);
    for (int32 i = 0; i < 34; i++)
    {
        int32 Count = 4;
        Count -= (int32)MyHand13[i];
        if (Input.SeenTiles34.IsValidIndex(i))
            Count -= (int32)Input.SeenTiles34[i];
        Pool[i] = (uint8)FMath::Max(0, Count);
    }
    return Pool;
}
```

**Step 3: Parallel simulation.** The naive approach of one task per candidate wastes cores when the simulation count is high, since each candidate's entire inner loop runs on a single core. Instead, each candidate's simulations are split into batches, distributing the full simulation budget across all available cores regardless of candidate count:

```cpp
const int32 NumCores   = FMath::Max(1, FPlatformMisc::NumberOfCoresIncludingHyperthreads());
const int32 NumBatches = FMath::Max(1, (NumCores * 4 + NumC - 1) / NumC);
const int32 SimsPerBatch = (NumSimulations + NumBatches - 1) / NumBatches;
const int32 TotalTasks   = NumC * NumBatches;

TArray BatchWins;  BatchWins.Init(0, TotalTasks);
TArray BatchTurns; BatchTurns.Init(0, TotalTasks);

ParallelFor(TotalTasks, [&](int32 FlatIdx)
{
    const int32 CIdx = FlatIdx / NumBatches;
    const int32 BIdx = FlatIdx % NumBatches;

    // XOR candidate seed with batch index for divergent random streams
    FRandomStream Rand(Candidates[CIdx].Seed ^ (BIdx * 2654435761u));

    int32 LocalWins = 0, LocalTurns = 0;
    for (int32 s = SimStart; s < SimEnd; ++s)
    {
        auto [Winner, Turns] = RunOneSimulation(
            Input, Candidates[CIdx].Hand13, Candidates[CIdx].UnknownList, Rand);

        if (Winner == Input.MyPlayerIndex) { ++LocalWins; LocalTurns += Turns; }
    }
    BatchWins[FlatIdx]  = LocalWins;
    BatchTurns[FlatIdx] = LocalTurns;
});
```

Each task writes to a unique flat slot in the pre-allocated arrays, avoiding any contention or atomics.

**Step 4: RunOneSimulation.** Each simulation shuffles the unknown tile list, deals hands to opponents, and plays the remaining tiles out as a wall. Each player discards greedily using the shanten calculator. After each discard both tsumo and ron are checked. The ron check is done in-place by temporarily adding the discarded tile to each opponent's hand rather than copying it:

```cpp
// Ron check — modify in place instead of copying
for (int32 p = 0; p < N; ++p)
{
    if (p == Current) continue;
    Hands[p][DiscardIdx]++;
    const bool bRon = (FShantenCalculator::Calculate(Hands[p]) == -1);
    Hands[p][DiscardIdx]--;
    if (bRon) return { p, MyTurnCount };
}
```

**Step 5: Scoring.** After aggregating results across batches, each candidate is scored by combining win rate, average turns to win, and the post-discard shanten. The turn and shanten penalties prevent the AI from favouring slow or risky lines that happen to win occasionally:

```cpp
R.Score = R.Winrate * 100.f
        - R.AvgTurnsToWin * 0.3f
        - R.AvgFinalShanten * 5.f;
```

Results are sorted by score and the top candidate is returned as the chosen discard.

### Async Wrapper

The entire evaluation runs off the game thread via a thread pool task, with the result delivered back to the game thread through a callback:

```cpp
void FMahjongMonteCarloSimulator::EvaluateDiscardsAsync(
    FMonteCarloInput Input, int32 NumSimulations,
    TFunction<void(TArray)> OnComplete)
{
    Async(EAsyncExecution::ThreadPool,
        [Input = MoveTemp(Input), NumSimulations,
         OnComplete = MoveTemp(OnComplete)]()
        {
            TArray Results = EvaluateDiscards(Input, NumSimulations);
            AsyncTask(ENamedThreads::GameThread,
                [Results = MoveTemp(Results), OnComplete]()
                {
                    OnComplete(Results);
                });
        });
}
```

### Performance

At 50 simulations per candidate the decision currently takes 3 to 5 seconds on the main thread in the non-async path. With parallelism enabled the full budget runs across all available cores, which brings this well under a second and would allow the simulation count to be increased significantly without hitting the 5-second target. Parallelism was added as a later improvement after the initial synchronous implementation.

---
## Showcase

The first video shows four Hard AI agents playing each other. The console output shows for each discard decision: total simulations run, candidate tiles considered, win rate of the chosen discard, average turns to win, and the resulting shanten. Only a few turns are shown since a full game takes considerable time at this simulation count.

<center>
<figure style="text-align: center;">
    <video controls muted style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/HardAi.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Four Hard difficulty agents playing each other</em></figcaption>
</figure>
</center>

The second video shows all three difficulty levels playing simultaneously: one Easy, two Medium, and one Hard. The difference in hand progression is visible through the shanten values logged each turn.
The Hard AI reached shanten 1 quickly and held there, waiting for the specific tile it needed. The Medium agents made slower but consistent progress. The random agent finished at shanten 3. The most telling moment comes near the end: the Hard AI's estimated win rate dropped from 58% to 2% after the tiles it was waiting on appeared in other players' discard piles. That's the simulation correctly updating on visible information rather than treating all tiles as equally available. Exactly what it should do.

<center>
<figure style="text-align: center;">
    <video controls muted style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/Difficulties.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Easy, Medium x2, and Hard agents playing each other</em></figcaption>
</figure>
</center>

---

## Reflection
The shanten calculator and the Monte Carlo system were interesting in completely different ways. The calculator is a pure algorithmic problem: finding an efficient representation of hand state that makes the calculation fast enough to run inside a simulation loop. Getting the lookup table approach right, especially around edge cases like quads splitting across groups, required understanding the problem deeply enough to know where the table model breaks down and why.
The Monte Carlo side was interesting for the opposite reason. The core algorithm is straightforward, but making it actually work well meant a series of careful decisions: pruning candidates before simulating, keeping random seeding on the game thread, batching simulations across cores rather than one task per candidate. None of those are obvious from the algorithm description alone. They came from thinking about where the naive implementation would be slow or wrong and working backwards from that.
If I continued the project the natural next step would be modelling opponent intent more explicitly. Right now simulated opponents play greedily, which underestimates how dangerous a player close to tenpai actually is. Incorporating that would make the win rate estimates meaningfully more accurate.

---
## References
- Yang, E.Z. (2014). [Calculating Shanten in Mahjong.](https://blog.ezyang.com/2014/04/calculating-shanten-in-mahjong/)
- Cowling, P.I., Powley, E.J., Whitehouse, D. (2012). [Information Set Monte Carlo Tree Search.](https://ieeexplore.ieee.org/document/6145622)
