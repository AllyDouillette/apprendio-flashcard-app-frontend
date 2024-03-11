import { useNavigate } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <h3>What this site was made for 📚 🐭</h3>
      <p>This site was created to have a web-based app to practice flashcards either at home or on the go. It was done as the creator&apos;s course graduation project.</p>
      <h3>How easy can I switch to your app?</h3>
      <p>Lernmausi was originally created because our original learning app migrated from local installation to web-only, not supplying the option for importing a bunch of data. So <em>yes</em>, if you have your data in some structured format such as .xlsx or .csv, you will be able to import it. We also supply you with a template, if you&apos;re at a loss where to start.</p>
      <h3>What if I want to use another app?</h3>
      <p>You are able to download your entire set of cards in either .csv format or .xlsx. We don&quot;t see the point in holding your data hostage just because we&apos;re not a great match for your learning journey.</p>
      <h3>Where is my data stored?</h3>
      <p>The database (essentially the heart of this app) is supplied by <a href="https://www.elephantsql.com/">ElephantSQL</a>, running on Google Servers. As ElephantSQL reaches End of Life in January 2025, we will probably migrate at some point in 2024.</p>
      <h3>What does &quot;Lernmausi&quot; mean?</h3>
      <p>&quot;Lernen&quot; is German for &quot;learning&quot;, &quot;Maus&quot; means &quot;mouse&quot;. You get a diminuitive of it by appending an -i, becoming an informal, affectionate term. It was also probably the most-used term among the creator of this site and their friends when this site came into existence. You pronounce it a bit like &quot;learnmousy&quot;, but with a more open e, non-rhothic r and a soft s: <em>[lehrnmaʊzi]</em>. It&apos;s not a pre-requisite to know this to sign up, though. Writing about pronounciation is a bit like dancing about architecture.</p>
      <p>You, too, can become a Lernmausi, simply by <a onClick={() => navigate("/register")}>signing up here</a>.</p>
    </div>
  )
}
