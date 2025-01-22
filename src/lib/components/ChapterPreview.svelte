<script>
  import { chapters } from "$constants";

  let selectedChapterNumber = $state(1);
  let selectedChapter = $derived(chapters.find(chapter => chapter.number === selectedChapterNumber));

  function selectChapter(number) {
    selectedChapterNumber = number;
  }

</script>

<section class="landing-page-section">
  <h2 class="mb-l">What you're getting</h2>
  <div class="chapter-container">
    <ul>
      {#each chapters as chapter}
        <li>
          <button
            class="chapter-title"
            class:selected-chapter-title={selectedChapterNumber === chapter.number}
            aria-controls={`chapter-info-${chapter.number}`}
            aria-expanded={selectedChapterNumber === chapter.number}
            onclick={() => selectChapter(chapter.number)}
          >
            <h3>Chapter {chapter.number}: {chapter.title}</h3>
          </button>
        </li>
      {/each}
    </ul>
    <div class="chapter-info">
      <h3 class="chapter-strapline italic mb-s">
        {selectedChapter.title}
      </h3>
      <p>{selectedChapter.excerpt}</p>
    </div>
  </div>
</section>

<style>
  .chapter-container {
    display: flex;
    justify-content: space-between;
  }

  .chapter-container ul {
    width: 40%;
  }

  .chapter-info {
    width: 55%;
  }

  .chapter-title {
    border-bottom: 1px solid grey;
    width: 100%;
    display: block;
    padding: 12px;
    text-align: left;
  }

  .selected-chapter-title {
    background-color: black;
    border: none;
    color: white;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
  }
</style>
