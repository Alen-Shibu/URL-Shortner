## Performance Testing

### V1 — Baseline

#### Load Test — 10 VUs

| Metric | Result |
|---|---:|
| Requests | 519 |
| Throughput | 51.3 req/s |
| Error rate | 0% |
| Average latency | 194 ms |
| p95 latency | 657 ms |

The service successfully handled the test with no failed requests.

---

#### Load Test — 100 VUs

| Metric | Result |
|---|---:|
| Requests | 563 |
| Throughput | 48.7 req/s |
| Error rate | 0% |
| Average latency | 1.92 s |
| p95 latency | 2.96 s |

Increasing concurrency did not increase throughput and significantly
increased latency, indicating that the system had reached a bottleneck.

---

### Stress Test — 1,000 VUs

| Metric | Result |
|---|---:|
| Maximum VUs | 1,000 |
| Requests | 53,430 |
| Throughput | ~2,000 req/s |
| Error rate | 99.02% |
| Failed requests | 52,911 |
| Successful requests | 519 |
| Maximum latency | 22.09 s |

The system was unable to sustain 1,000 concurrent VUs. Although k6
generated approximately 2,000 requests/sec, 99.02% of requests failed,
so this should not be interpreted as the application's throughput.

The successful requests experienced very high latency, with the
`expected_response:true` subset averaging approximately 20.14 seconds.

This stress test establishes the failure boundary of the current
implementation and provides a baseline for subsequent optimizations.