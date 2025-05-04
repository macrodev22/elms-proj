import Card from '../components/Card'

const Stats = () => {
    return (
        <Card className="relative mt-[-80px] p-4 mx-12">
            <h2 className='text-2xl font-semibold mb-4'>Stats</h2>
            {[1,2,3,4,5].map(e => <div className='m-2'>{e}</div>)}
        </Card>
    )
}

export default Stats